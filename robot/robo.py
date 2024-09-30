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
        self.video_client_connected = False
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
        print("write 1", self.check[0])
        try:
            if self.check[0] == 0:
                print("write 2")
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
        if self.command_client_connected:
            # 기존 클라이언트가 연결되어 있음을 알리고 연결 종료
            #await websocket.send(json.dumps({"error": "이미 명령 서버에 연결된 클라이언트가 있습니다."}))
            await websocket.close()
            print(f"추가 클라이언트가 명령 서버에 연결하려 했으나 거부되었습니다: {websocket.remote_address}")
            return

        self.command_client_connected = True
        print(f"명령 WebSocket 클라이언트가 연결되었습니다: {websocket.remote_address}")

        # speed setting when connection is comming
        self.speed = self.cspeed


        try:
            async for message in websocket:
                print(f"수신된 메시지: {message}")
                try:
                    # JSON 형식의 명령어를 파싱
                    data = json.loads(message)
                    command = data.get("command", "")
                    value = data.get("value", 0)

                    # 수신된 명령어에 따라 동작 처리
                    if command == "move":
                        angle = data.get("angle", 0) * self.asens  # Apply asens

                        speed = self.speed  # Use self.speed set in hp_con

                        self.move(angle, speed)
                    elif command == "stop":
                        self.speed = 0
                        self.stop()
                        
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
            if websocket :
                await websocket.close()

    async def send_video(self, websocket, path):

        if self.video_client_connected:
            # 기존 클라이언트가 연결되어 있음을 알리고 연결 종료
            # await websocket.send(json.dumps({"error": "이미 비디오 서버에 연결된 클라이언트가 있습니다."}))
            await websocket.close()
            print(f"추가 클라이언트가 비디오 서버에 연결하려 했으나 거부되었습니다: {websocket.remote_address}")
            return

        self.video_client_connected = True
        print(f"비디오 WebSocket 클라이언트가 연결되었습니다: {websocket.remote_address}")

        try:
            while True:
                ret, frame = self.cap.read()
                if not ret:
                    print("프레임을 가져올 수 없습니다.")
                    await asyncio.sleep(0.03)
                    continue

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
                        print(f"프레임 저장: {filepath}")
                        self.save_count += 1

                # Encode frame as JPEG
                _, buffer = cv2.imencode('.jpg', frame)
                frame_data = base64.b64encode(buffer).decode('utf-8')

                if frame_data:
                    await websocket.send(frame_data)

                await asyncio.sleep(0.03)

        except websockets.exceptions.ConnectionClosed as e:
            print(f"비디오 WebSocket 클라이언트 연결이 종료되었습니다: {e.code} - {e.reason}")

        except Exception as e:
            await websocket.close()
            print(f"비디오 WebSocket 핸들러에서 예외 발생: {e}")

        finally:
            await websocket.close()
            self.video_client_connected = False
            print(f"비디오 WebSocket 클라이언트 연결 상태가 해제되었습니다: {websocket.remote_address}")

    async def start_servers(self):

        try:
            # 웹소켓 서버 시작
            print("웹소켓 서버가 시작됩니다.")
            video_server = await websockets.serve(self.send_video, '0.0.0.0', 8765)
            command_server = await websockets.serve(self.receive_command, '0.0.0.0', 8766)

            print("웹소켓 서버가 정상적으로 시작되었습니다.")

            # 서버를 계속 실행시키기 위해 Future 대기
            await asyncio.Future()

        except Exception as e:
            print(f"서버 시작 중 오류 발생: {e}")

    def dir_clean(self, dir):
        _dir = "/home/jetson/share/ls"
        path = os.path.join(_dir, dir)
        del_dir(path)


    def hp_con(self, sdir, idiv, cspeed, asens):
        self.sdir = sdir
        self.idiv = idiv
        self.cspeed = cspeed
        self.asens = asens

        # Set save directory
        self.save_dir = os.path.join("/home/jetson/share/ls", self.sdir)
        os.makedirs(self.save_dir, exist_ok=True)
        print(f"이미지 저장 디렉토리: {self.save_dir}")

        # Initialize frame counters
        self.frame_count = 0
        self.save_count = 0


        # Start the WebSocket servers
        asyncio.run(self.start_servers())

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

    def net_wifi(self):
        cmd = "ifconfig wlan0"
        os.system(cmd)

        
# 클래스 외부에 위치해야 합니다.
if __name__ == "__main__":

    print("로봇이 시작되었습니다.")

    robo = robot_control()


    #robo.dir_clean("lane0")
    #robo.hp_con("lane0",3, 20, 1)
    # Example usage of hp_con
    # Replace 'lane0', 3, 100, 1 with desired parameters
    # robo.hp_con("lane0", 3, 100, 1)

    # To keep the main thread alive if not using hp_con immediately
    #try:
    #    while True:
    #        time.sleep(1)
    #except KeyboardInterrupt:
    #    robo.sig_callback(None, None)

