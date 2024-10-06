#!/usr/bin/python3

import time
from Adafruit_MotorHAT import Adafruit_MotorHAT, Adafruit_DCMotor
import Adafruit_GPIO.I2C as I2C
from smbus2 import SMBus  # I2C 버스를 열고 닫기 위한 smbus2 사용
import fcntl  # 파일 잠금을 위한 fcntl 모듈

import Jetson.GPIO as GPIO
import signal

import cv2
import asyncio
import websockets
import base64
import os
import json
import numpy as np
import math
import threading


from util import del_dir
from util import gstreamer_pipeline

import SharedArray as sarray


SHM_NAME = "shm://pass"
SHM_SIZE = 640 * 360 * 3 + 1  # 예: RGB 이미지 + 플래그


# 잠금을 위한 파일 생성
LOCK_FILE = "/tmp/i2c_bus_lock"
IMAGE_LOCK_FILE = "/tmp/image_lock"


# 파일 잠금 (I2C 버스 접근을 동기화하기 위한 방법)
def acquire_lock(lockfile):
    lockfile_handle = open(lockfile, "w")
    fcntl.flock(lockfile_handle, fcntl.LOCK_EX)  # 배타적 잠금
    return lockfile_handle

# 파일 잠금 해제
def release_lock(lockfile_handle):
    fcntl.flock(lockfile_handle, fcntl.LOCK_UN)
    lockfile_handle.close()


# I2C 버스 열기 (smbus2 사용)
def open_i2c_bus():
    return SMBus(1)  # I2C 버스 1 (/dev/i2c-1)을 엽니다.

# I2C 버스 닫기
def close_i2c_bus(i2c_bus):
    i2c_bus.close()


class robot_control:

    angle = 0
    speed = 0
    asens = 1  # Default value
    sdir = ""
    idiv = 1
    frame_count = 0
    save_count = 0
    cspeed = 0


    def __init__(self):

        self.command_client_connected = False
        self.command_lock = threading.Lock()
        self.current_command = None  # 현재 명령을 저장하기 위한 변수


        try:
            self.check = sarray.attach(SHM_NAME)
        except:
            pass


        signal.signal(signal.SIGINT, self.sig_callback)
        signal.signal(signal.SIGTERM, self.sig_callback)


        # Jetson Nano에서는 I2C 버스를 직접 지정
        I2C.get_default_bus = lambda: 1  # i2c-1 버스를 사용

        # Motor HAT 객체 생성
        self.mh = Adafruit_MotorHAT(addr=0x60)

        # 모터 초기화
        self.leftMotor = self.mh.getMotor(1)  # 좌측 모터
        self.rightMotor = self.mh.getMotor(2)  # 우측 모터

        # 카메라는 hp_con 호출 시 초기화

        # 포트별 클라이언트 상태 변수 초기화
        self.command_client_connected = False

        # 프레임 공유를 위한 변수 초기화
        self.frame_lock = asyncio.Lock()
        self.current_frame = None

        # Initialize save directory
        self.save_dir = ""


        # Initialize and start camera
        self.cap = cv2.VideoCapture(gstreamer_pipeline(), cv2.CAP_GSTREAMER)
        if not self.cap.isOpened():
            print("카메라를 열 수 없습니다.")
            return
        else:
            print("카메라가 정상적으로 열렸습니다.")

        # WebSocket 서버를 위한 변수 초기화
        self.ws_loop = None
        self.ws_thread = None


    def get_img(self):
        for _ in range(10):
            ret, frame = self.cap.read()
            if not ret:
                print("프레임을 가져올 수 없습니다.")
                time.sleep(0.05)
                continue
            return frame 
        return None 

    def dis_img(self, img):

        # 이미지 공유 메모리에 쓰기 전에 이미지 잠금 획득
        lockfile_handle = acquire_lock(IMAGE_LOCK_FILE)
        #print("write 1", self.check[0])
        try:
            if self.check[0] == 0:
                #print("write 2")
                # 공유 메모리에 이미지 쓰기 (인덱스 1부터 시작)
                self.check[1:] = img.reshape(-1)   
                self.check[0] = 1
        finally:
            # 이미지 잠금 해제
            release_lock(lockfile_handle)

    def draw_dir_line_c(self,img, angle, color=(255, 255, 0), line_thickness=10):
        # 각도를 라디안으로 변환하여 sin, cos 계산
        rad = math.radians(angle)
        
        # 선의 시작점과 끝점 계산
        x1, y1 = img.shape[1] // 2, img.shape[0]
        x2, y2 = int(x1 - math.sin(rad) * 200), int(y1 - math.cos(rad) * 200)
        
        # 선 그리기
        cv2.line(img, (x1, y1), (x2, y2), color, line_thickness)
        return img
                
    def dis_img_ang(self,img, angle):

        # 이미지를 복사
        _img = img.copy()
        # 각도 텍스트 추가
        cv2.putText(_img, str(angle), (50, 50), cv2.FONT_HERSHEY_SIMPLEX, 2, (0, 255, 0), 5)
        # 방향선을 그리기 (색상 선택)
        _img = self.draw_dir_line_c(_img, angle, color=(255, 255, 0))
        self.dis_img(_img)


    def stop(self):
        self.mh.getMotor(1).run(Adafruit_MotorHAT.RELEASE)
        self.mh.getMotor(2).run(Adafruit_MotorHAT.RELEASE)

    # 모터 속도 및 방향 제어 함수
    def move(self, angle, speed):

        # 각도를 -45 ~ 45 사이로 제한
        # speed -255 ~ 255 사이로 제한
        angle = max(-45, min(45, angle))
        speed = max(-255, min(255, speed))

        # 기존 값과 ±5 차이가 나지 않으면 함수 종료
        angle_diff_alpha = 5
        if abs(angle - self.angle) <= angle_diff_alpha and speed == self.speed:
            return

        self.angle = angle
        self.speed = speed

        i2c_bus = open_i2c_bus()

        # stop
        if angle == 0 and speed == 0:
            self.mh.getMotor(1).run(Adafruit_MotorHAT.RELEASE)
            self.mh.getMotor(2).run(Adafruit_MotorHAT.RELEASE)

        # go
        elif angle == 0 and speed > 0:
            print("start here")
            self.leftMotor.run(Adafruit_MotorHAT.BACKWARD)
            self.leftMotor.setSpeed(abs(int(speed)))

            self.rightMotor.run(Adafruit_MotorHAT.BACKWARD)
            self.rightMotor.setSpeed(abs(int(speed)))

        # back
        elif angle == 0 and speed < 0:
            self.leftMotor.run(Adafruit_MotorHAT.FORWARD)
            self.rightMotor.run(Adafruit_MotorHAT.FORWARD)
            self.leftMotor.setSpeed(abs(int(speed)))
            self.rightMotor.setSpeed(abs(int(speed)))

        # left(+)
        elif angle > 0 and speed > 0:  # left direction turn
            self.leftMotor.run(Adafruit_MotorHAT.BACKWARD)
            self.rightMotor.run(Adafruit_MotorHAT.BACKWARD)
            self.leftMotor.setSpeed(abs(int(speed)))
            self.rightMotor.setSpeed(abs(int(speed + abs(angle))))  # right motor value up

        # right(-)
        elif angle < 0 and speed > 0:  # right direction turn
            print("right")
            self.leftMotor.run(Adafruit_MotorHAT.BACKWARD)
            self.rightMotor.run(Adafruit_MotorHAT.BACKWARD)
            self.rightMotor.setSpeed(abs(int(speed)))
            self.leftMotor.setSpeed(abs(int(speed + abs(angle))))  # left motor value up

        close_i2c_bus(i2c_bus)



    async def receive_command(self, websocket, path):
        print("start receive_command")

        if self.command_client_connected:
            await websocket.close()
            print(f"추가 클라이언트가 명령 서버에 연결하려 했으나 거부되었습니다: {websocket.remote_address}")
            return

        self.command_client_connected = True
        print(f"명령 WebSocket 클라이언트가 연결되었습니다: {websocket.remote_address}")
        self.speed = self.cspeed

        try:
            async for message in websocket:
                print(f"수신된 메시지: {message}")
                try:
                    data = json.loads(message)
                    command = data.get("command", "")
                    angle = data.get("angle", 0) * self.asens

                    with self.command_lock:
                        if command == "move":
                            self.current_command = ("move", angle)
                        elif command == "stop":
                            self.current_command = ("stop", 0)
                        else:
                            print("알 수 없는 명령어입니다.")
                except json.JSONDecodeError:
                    print("잘못된 JSON 형식의 메시지입니다.")
        except websockets.exceptions.ConnectionClosed as e:
            print(f"명령 WebSocket 클라이언트 연결이 종료되었습니다: {e.code} - {e.reason}")
        except Exception as e:
            print(f"명령 WebSocket 핸들러에서 예외 발생: {e}")
        finally:
            self.command_client_connected = False
            print(f"명령 WebSocket 클라이언트 연결 상태가 해제되었습니다: {websocket.remote_address}")

            if websocket:
                await websocket.close()


    def start_ws_server(self):
        asyncio.set_event_loop(self.ws_loop)
        server = websockets.serve(self.receive_command, "0.0.0.0", 8766)
        print(server)
        self.ws_loop.run_until_complete(server)
        print("WebSocket 서버가 시작되었습니다.")
        self.ws_loop.run_forever()


    def hp_con(self, sdir, cspeed, idiv, asens):

        self.sdir = sdir
        self.idiv = idiv
        self.cspeed = cspeed
        self.asens = asens

        if "lane" in sdir:  

            self.dir_clean(sdir)

            self.save_dir = os.path.join("/home/jetson/share/lane", self.sdir)
            os.makedirs(self.save_dir, exist_ok=True)

            print(f"이미지저장디렉토리: {self.save_dir}")
        elif "mark" in sdir:

            self.dir_clean(sdir)

            # Set save directory
            self.save_dir = os.path.join("/home/jetson/share/mark", self.sdir)
            os.makedirs(self.save_dir, exist_ok=True)
            print(f"이미지저장디렉토리: {self.save_dir}")

        # Initialize frame counters
        self.frame_count = 0
        self.save_count = 0


        # WebSocket 서버를 위한 이벤트 루프와 스레드 초기화
        self.ws_loop = asyncio.new_event_loop()
        self.ws_thread = threading.Thread(target=self.start_ws_server, daemon=True)
        self.ws_thread.start()

        try:
            while True:
                frame = self.get_img()

                with self.command_lock:
                    if self.current_command:
                        command, value = self.current_command
                        if command == "move":
                            angle = value
                            speed = self.cspeed
                            self.move(angle, speed)
                        elif command == "stop":
                            self.speed = 0
                            self.stop()
                        self.current_command = None  # 명령 처리 후 초기화

                if self.command_client_connected:
                    self.frame_count += 1
                    # Save every idiv-th frame
                    if self.frame_count % self.idiv == 0 and self.speed != 0:
                        # Ensure save_dir is set
                        if not self.save_dir:
                            print("저장 디렉토리가 설정되지 않았습니다.")
                        else:
                            # Create file name
                            filename = f"{self.save_count:03d}_{self.angle:03d}.jpg"
                            filepath = os.path.join(self.save_dir, filename)
                            cv2.imwrite(filepath, frame)
                            print(f"fsave:{filepath}")
                            self.save_count += 1

                            if self.save_count > 999:
                                self.save_count = 0

                self.dis_img(frame)
                time.sleep(0.05)
        except KeyboardInterrupt:
            print("hp_con 함수가 중단되었습니다.")
        finally:
            print("hp_con 종료됨")
            self.stop()
            # WebSocket 이벤트 루프 종료
            if self.ws_loop.is_running():
                self.ws_loop.call_soon_threadsafe(self.ws_loop.stop)
                self.ws_thread.join()
                print("WebSocket 서버가 종료되었습니다.")


    def dir_clean(self, dir):
        
        if "lane" in dir:
            _dir = "/home/jetson/share/lane"
        if "mark" in dir:
            _dir = "/home/jetson/share/mark"

        path = os.path.join(_dir, dir)
        del_dir(path)


    def sig_callback(self, signal, frame):

        print('Signal Interrupted')
        print('프로그램이 종료 중입니다...')
        try:
            asyncio.get_event_loop().stop()  # asyncio 이벤트 루프 중단
        except RuntimeError:
            pass  # 이미 루프가 종료된 경우 무시

        self.stop()

        if self.cap:
            self.cap.release()
            self.cap = None

        try:
            pass
            #self.shm.close()
            #self.shm.unlink()
        except Exception as e:
            print(f"공유 메모리 해제 중 오류 발생: {e}")

        # Cleanup GPIO if needed
        #GPIO.cleanup()

        print('자원이 정리되었습니다. 종료합니다.')
        os._exit(0)  # 프로그램 완전 종료

    def led_left(self, on_off, back=None):
        try:
            pin = 12
            GPIO.setmode(GPIO.BOARD)
            GPIO.setup(pin, GPIO.OUT, initial=GPIO.LOW)  # set pin as an output pin

            if on_off == 0:
                GPIO.output(pin, 0)
            else:
                GPIO.output(pin, 1)
        finally:
            GPIO.cleanup()

    def led_right(self, on_off):
        try:
            pin = 11
            GPIO.setmode(GPIO.BOARD)
            GPIO.setup(pin, GPIO.OUT, initial=GPIO.LOW)  # set pin as an output pin
            if on_off == 0:
                GPIO.output(pin, 0)
            else:
                GPIO.output(pin, 1)
        finally:
            GPIO.cleanup()

    def beep(self):
        try:
            pin = 40
            GPIO.setmode(GPIO.BOARD)  # BOARD pin-numbering scheme
            GPIO.setup(pin, GPIO.OUT)  # button pin set as input
            GPIO.output(pin, 1)
        finally:
            GPIO.output(pin, 0)
            GPIO.cleanup()

    def delay(self, s):
        time.sleep(s)



    def get_ip(self, dev="wlan0"):

        import subprocess

        # nmcli 명령어로 네트워크 정보 가져오기
        command = ["sudo" , "nmcli", "-f", "IP4.ADDRESS", "device", "show", dev]

        try:
            result = subprocess.run(command, check=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)
            
            # IP 주소 추출
            for line in result.stdout.splitlines():
                if "IP4.ADDRESS" in line:
                    ip_address = line.split()[1]  # IP 주소 부분만 추출
                    print(f"=> Now {dev} IP Address: {ip_address}")
                    break
        except subprocess.CalledProcessError as e:
            print("Error occurred:", e.stderr)

    def list_ap(self): 

        import subprocess

        try:
            # nmcli 명령 실행
            result = subprocess.run(["nmcli", "device", "wifi", "list"], check=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)

            # 결과에서 첫 번째 열(MAC 주소) 제거
            lines = result.stdout.splitlines()
            for line in lines:
                # 각 줄의 첫 번째 단어(MAC 주소)를 제거
                parts = line.split()
                print(" ".join(parts[1:]))  # 첫 번째 항목을 제외하고 출력

        except subprocess.CalledProcessError as e:
            print("Error occurred:", e.stderr)



    def conn_ap(self, ssid, pw=""):

        import subprocess



        # nmcli 명령어 생성
        command = ["sudo", "nmcli", "device", "disconnect", "wlan0" ]
        # 명령어 실행
        try:
            result = subprocess.run(command, check=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)
            print("Connection successful:", result.stdout)
        except subprocess.CalledProcessError as e:
            print("Error occurred:", e.stderr)


        if pw == "":
            # nmcli 명령어 생성
            command = ["sudo", "nmcli", "device", "wifi", "connect", ssid ]
        else:
            command = ["sudo", "nmcli", "device", "wifi", "connect", ssid, "password", pw]

        # 명령어 실행
        try:
            result = subprocess.run(command, check=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)
            print("Connection successful:", result.stdout)
        except subprocess.CalledProcessError as e:
            print("Error occurred:", e.stderr)

        time.sleep(1)

        self.get_ip()




    def set_hotspot(self, ipaddr="192.168.5.1"):
        
        import subprocess

        try:

            # nmcli 명령어 생성
            command = ["sudo", "nmcli", "device", "connect", "wlan0" ]
            # 명령어 실행
            try:
                result = subprocess.run(command, check=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)
                print("Connection successful:", result.stdout)
            except subprocess.CalledProcessError as e:
                print("Error occurred:", e.stderr)


            # 2. Hotspot 연결 중지
            #subprocess.run(["sudo", "nmcli", "con", "down", "Hotspot"], check=True)
            #print("Hotspot has been brought down.")

            # 인터페이스를 wlan0으로 명시
            subprocess.run(["sudo", "nmcli", "connection", "modify", "Hotspot", "connection.interface-name", "wlan0"], check=True)
            print("Hotspot interface set to wlan0.")

            time.sleep(1)

            # 3. IPv4 주소 설정
            subprocess.run(["sudo", "nmcli", "connection", "modify", "Hotspot", "ipv4.addresses", f"{ipaddr}/24"], check=True)
            print("IPv4 address set to 192.168.5.1/24.")

            # 4. 게이트웨이 설정
            subprocess.run(["sudo", "nmcli", "connection", "modify", "Hotspot", "ipv4.gateway", f"{ipaddr}"], check=True)
            print(f"IPv4 gateway set to {ipaddr}.")

            # 5. 수동 IP 설정
            subprocess.run(["sudo", "nmcli", "connection", "modify", "Hotspot", "ipv4.method", "shared"], check=True)
            print("IP method set to manual.")

            # 6. Hotspot 연결 다시 활성화
            subprocess.run(["sudo", "nmcli", "con", "up", "Hotspot", "ifname", "wlan0"], check=True)
            print("Hotspot has been brought up.")
            time.sleep(5)

        except subprocess.CalledProcessError as e:
            print(f"An error occurred: {e.stderr}")



        
# 클래스 외부에 위치해야 합니다.
if __name__ == "__main__":

    print("로봇이 시작되었습니다.")

    robo = robot_control()


    #robo.dir_clean("lane0")
    #robo.hp_con("lane0",3, 20, 1)
    # Example usage of hp_con
    # Replace 'lane0', 3, 100, 1 with desired parameters
    robo.hp_con("lane0", 3, 1, 1)

    # To keep the main thread alive if not using hp_con immediately
    #try:
    #    while True:
    #        time.sleep(1)
    #except KeyboardInterrupt:
    #    robo.sig_callback(None, None)

