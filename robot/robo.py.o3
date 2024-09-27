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

from gsstr import gstreamer_pipeline

# 잠금을 위한 파일 생성
LOCK_FILE = "/tmp/i2c_bus_lock"

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


class robot_control():

    angle = 0
    speed = 0


    def __init__(self):

        signal.signal(signal.SIGINT, self.sig_callback)
        signal.signal(signal.SIGTERM, self.sig_callback)

        # Jetson Nano에서는 I2C 버스를 직접 지정
        I2C.get_default_bus = lambda: 1  # i2c-1 버스를 사용


        # Motor HAT 객체 생성
        self.mh = Adafruit_MotorHAT(addr=0x60)

        # 모터 초기화
        self.leftMotor = self.mh.getMotor(1)  # 좌측 모터
        self.rightMotor = self.mh.getMotor(2)  # 우측 모터


        # 카메라를 초기화 (초기화 시점에 카메라를 열도록 수정)
        self.cap = cv2.VideoCapture( gstreamer_pipeline(),  cv2.CAP_GSTREAMER)
        if not self.cap.isOpened():
            print("카메라를 열 수 없습니다.")
            return
        else:
            print("카메라가 정상적으로 열렸습니다.")


    # I2C 버스 열기 (smbus2 사용)
    def open_i2c_bus(self):
        return SMBus(1)  # I2C 버스 1 (/dev/i2c-1)을 엽니다.

    # I2C 버스 닫기
    def close_i2c_bus(self,i2c_bus):
        i2c_bus.close()


    def stop(self):
        self.mh.getMotor(1).run(Adafruit_MotorHAT.RELEASE)
        self.mh.getMotor(2).run(Adafruit_MotorHAT.RELEASE)


    # 모터 속도 및 방향 제어 함수
    def move(self, angle, speed):

        # 각도를 -45 ~ 45 사이로 제한
        # speed -255 ~ 255 사이로 제한
        angle = max(-45, min(45, angle))
        speed = max(-255, min(255,speed))


        # 기존 값과 ±5 차이가 나지 않으면 함수 종료
        angle_diff_alpa = 5
        if abs(angle - self.angle) <= angle_diff_alpa  and speed == self.speed:
            return

        self.angle = angle
        self.speed = speed

        i2c_bus = open_i2c_bus()

        # stop
        if angle == 0 and speed == 0 :
            self.mh.getMotor(1).run(Adafruit_MotorHAT.RELEASE)
            self.mh.getMotor(2).run(Adafruit_MotorHAT.RELEASE)

        # go
        if angle == 0 and speed > 0 :
            print("start here")
            self.leftMotor.run(Adafruit_MotorHAT.BACKWARD)
            self.leftMotor.setSpeed(abs(int(speed)))

            self.rightMotor.run(Adafruit_MotorHAT.BACKWARD)
            self.rightMotor.setSpeed(abs(int(speed)))

        # back
        if angle == 0 and speed < 0 :
            self.leftMotor.run(Adafruit_MotorHAT.FORWARD)
            self.leftMotor.run(Adafruit_MotorHAT.FORWARD)
            self.rightMotor.setSpeed(abs(int(speed)))
            self.rightMotor.setSpeed(abs(int(speed)))


        #left(+)
        if angle > 0 and speed > 0 : # left direction turn

            self.leftMotor.run(Adafruit_MotorHAT.BACKWARD)
            self.leftMotor.run(Adafruit_MotorHAT.BACKWARD)

            self.leftMotor.setSpeed(abs(int(speed)))
            self.rightMotor.setSpeed(abs(int(speed + abs(angle)))) # right motor value up

            #self.rightMotor.setSpeed(abs(int(speed)))
            #self.leftMotor.setSpeed(abs(int(speed + angle))) # right motor value up

        #right(-)
        if angle < 0 and speed > 0 : # right direction turn

            print("right")

            self.leftMotor.run(Adafruit_MotorHAT.BACKWARD)
            self.leftMotor.run(Adafruit_MotorHAT.BACKWARD)

            #self.leftMotor.setSpeed(abs(int(speed)))
            #self.rightMotor.setSpeed(abs(int(speed + abs(angle)))) # left motor value up

            self.rightMotor.setSpeed(abs(int(speed)))
            self.leftMotor.setSpeed(abs(int(speed + abs(angle)))) # right motor value up

        close_i2c_bus(i2c_bus)

    async def send_video(self, websocket, path):
        try:
            while True:
                ret, frame = self.cap.read()
                if not ret:
                    print("프레임을 가져올 수 없습니다.")
                    break

                # 프레임을 JPEG로 인코딩
                _, buffer = cv2.imencode('.jpg', frame)
                # 바이트 데이터를 base64 문자열로 변환
                frame_data = base64.b64encode(buffer).decode('utf-8')
                # 웹소켓을 통해 데이터 전송
                await websocket.send(frame_data)
                # 프레임 속도 조절 (약 30fps)
                await asyncio.sleep(0.03)
        except websockets.exceptions.ConnectionClosed:
            print("클라이언트 연결이 종료되었습니다.")

        finally:
            pass
            #self.cap.release()


    def start_hp_con(self):
        # 웹소켓 서버 시작
        print("웹소켓 서버가 시작됩니다.")
        start_server = websockets.serve(self.send_video, '0.0.0.0', 8765)


        # asyncio 루프 실행 및 블로킹
        loop = asyncio.get_event_loop()
        loop.run_until_complete(start_server)
        try:
            loop.run_forever()
        except KeyboardInterrupt:
            print("Ctrl + C 입력 감지됨. 프로그램 종료 중...")
            self.sig_callback(None, None)


        # asyncio 루프 실행 및 블로킹
        #asyncio.get_event_loop().run_until_complete(start_server)
        #asyncio.get_event_loop().run_forever()



    def sig_callback(self, signal, frame):

        print('sg Interrupted')

        print('프로그램이 종료 중입니다...')
        asyncio.get_event_loop().stop()  # asyncio 이벤트 루프 중단
        self.stop()


        if self.cap:
            self.cap.release()
            self.cap = None

        print('자원이 정리되었습니다. 종료합니다.')
        os._exit(0)  # 프로그램 완전 종료




    def led_left(self, on_off, back=None):
        try:
            pin = 12
            GPIO.setmode(GPIO.BOARD)
            GPIO.setup(pin, GPIO.OUT, initial=GPIO.LOW)  # set pin as an input pin

            if on_off == 0 :
                GPIO.output(pin, 0)
            else:
                GPIO.output(pin, 1)
        finally:
            GPIO.cleanup()


    def led_right(self, on_off):
        try:
            pin = 11
            GPIO.setmode(GPIO.BOARD)
            GPIO.setup(pin, GPIO.OUT, initial=GPIO.LOW)  # set pin as an input pin
            if on_off == 0 :
                GPIO.output(pin, 0)
            else:
                GPIO.output(pin, 1)
        finally:
            GPIO.cleanup()


    def beep(self):
        try:
            pin =  40
            GPIO.setmode(GPIO.BOARD) # BOARD pin-numbering scheme
            GPIO.setup(pin, GPIO.OUT) # button pin set as input
            GPIO.output(pin, 1)
        finally:
            GPIO.output(pin, 0)
            GPIO.cleanup()


    def delay(self,s):
        time.sleep(s)


    def net_wifi(self):
        cmd = "ifconfig wlan0"
        os.system(cmd)   


    def hp_con(self):
        # 새로운 프로세스를 생성하여 비디오 스트림 시작
        p = multiprocessing.Process(target=video_stream_process)
        p.start()

    def video_stream_process(self):
        # CSI 카메라를 GStreamer 파이프라인으로 열기, 해상도 640x360으로 설정
        cap = cv2.VideoCapture(gstreamer_pipeline(), cv2.CAP_GSTREAMER)

        # 카메라가 정상적으로 열렸는지 확인
        if not cap.isOpened():
            print("카메라를 열 수 없습니다.")
            return

        async def send_video(websocket, path):
            try:
                while True:
                    ret, frame = cap.read()
                    if not ret:
                        print("프레임을 가져올 수 없습니다.")
                        break

                    # 프레임을 JPEG로 인코딩
                    _, buffer = cv2.imencode('.jpg', frame)
                    # 바이트 데이터를 base64 문자열로 변환
                    frame_data = base64.b64encode(buffer).decode('utf-8')
                    # 웹소켓을 통해 데이터 전송
                    await websocket.send(frame_data)
                    # 프레임 속도 조절 (약 30fps)
                    await asyncio.sleep(0.03)
            except websockets.exceptions.ConnectionClosed:
                print("클라이언트 연결이 종료되었습니다.")
            finally:
                cap.release()

        # 웹소켓 서버 시작
        start_server = websockets.serve(send_video, '0.0.0.0', 8765)

        print("웹소켓 서버가 ws://0.0.0.0:8765 에서 시작되었습니다.")
        asyncio.get_event_loop().run_until_complete(start_server)
        asyncio.get_event_loop().run_forever()



if __name__ == "__main__" :

    robo = robot_control()
    print("start roto")

#    robo.move(0, 20)
#    robo.delay(2)
#    print("end")
#
#    robo.move(-5, 20)
#    robo.delay(5)
#
#    robo.stop()
#


    robo.start_hp_con()



