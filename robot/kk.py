#!/usr/bin/python3
#!/usr/bin/python3

import time
import json
from Adafruit_MotorHAT import Adafruit_MotorHAT, Adafruit_DCMotor
import Adafruit_GPIO.I2C as I2C
import Jetson.GPIO as GPIO
import signal
import cv2
import asyncio
import websockets
import base64
import os

from gsstr import gstreamer_pipeline

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

        # 카메라를 초기화
        self.cap = cv2.VideoCapture(gstreamer_pipeline(), cv2.CAP_GSTREAMER)
        if not self.cap.isOpened():
            print("카메라를 열 수 없습니다.")
            self.cap = None
            return
        else:
            print("카메라가 정상적으로 열렸습니다.")

    def stop(self):
        self.mh.getMotor(1).run(Adafruit_MotorHAT.RELEASE)
        self.mh.getMotor(2).run(Adafruit_MotorHAT.RELEASE)

    # 모터 속도 및 방향 제어 함수
    def move(self, angle, speed):
        # 각도와 속도 제한
        angle = max(-45, min(45, angle))
        speed = max(-255, min(255, speed))

        print(f"Move: angle={angle}, speed={speed}")
        # 모터 제어 로직 구현 (필요에 따라 추가)

    async def receive_command(self, websocket, path):
        try:
            async for message in websocket:
                print(f"수신된 메시지: {message}")
                try:
                    # JSON 형식의 명령어를 파싱
                    data = json.loads(message)
                    command = data.get("command", "")
                    # 수신된 명령어에 따라 동작 처리
                    if command == "move":
                        angle = data.get("angle", 0)
                        speed = data.get("speed", 0)
                        self.move(angle, speed)
                    elif command == "stop":
                        self.stop()
                    else:
                        print("알 수 없는 명령어입니다.")
                except json.JSONDecodeError:
                    print("잘못된 JSON 형식의 메시지입니다.")
        except websockets.exceptions.ConnectionClosed:
            print("명령어 수신 서버 연결이 종료되었습니다.")

    async def send_video(self, websocket, path):
        try:
            if self.cap is None:
                print("카메라가 초기화되지 않았습니다.")
                return

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
        except Exception as e:
            print(f"영상 전송 중 오류 발생: {e}")
        finally:
            pass
#            if self.cap:
#                self.cap.release()
#                self.cap = None

    async def start_servers(self):
        try:
            # 웹소켓 서버 시작
            print("웹소켓 서버가 시작됩니다.")
            # 서버를 await하여 실제로 시작되도록 합니다.
            video_server = await websockets.serve(self.send_video, '0.0.0.0', 8765)
            command_server = await websockets.serve(self.receive_command, '0.0.0.0', 8766)

            # 이벤트 루프를 유지하여 서버가 계속 동작하도록 합니다.
            await asyncio.Future()  # 무한 대기
        except Exception as e:
            print(f"서버 시작 중 오류 발생: {e}")

    def start_hp_con(self):
        try:
            asyncio.run(self.start_servers())
        except Exception as e:
            print(f"프로그램 실행 중 오류 발생: {e}")

    def sig_callback(self, signal_received, frame):
        print('프로그램이 종료 중입니다...')
        self.stop()
        if self.cap:
            self.cap.release()
            self.cap = None
        print('자원이 정리되었습니다. 종료합니다.')
        os._exit(0)

if __name__ == "__main__" :

    try:
        robo = robot_control()
        print("로봇이 시작되었습니다.")
        robo.start_hp_con()
    except Exception as e:
        print(f"프로그램 실행 중 오류 발생: {e}")

