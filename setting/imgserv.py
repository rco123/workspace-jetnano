#!/usr/bin/python3
# -*- coding: utf-8 -*-

import asyncio
import time
import cv2
import numpy as np
import base64
from multiprocessing import shared_memory
import websockets
from websockets import WebSocketServerProtocol
import fcntl
import os
import signal
import Jetson.GPIO as GPIO  # GPIO 사용 시 필요

# 공유 메모리 설정
SHM_NAME = 'pass_shm'
IMAGE_HEIGHT = 360
IMAGE_WIDTH = 640
IMAGE_CHANNELS = 3
SHM_SIZE = IMAGE_HEIGHT * IMAGE_WIDTH * IMAGE_CHANNELS + 1  # 첫 번째 바이트는 플래그

# 잠금 파일 경로 정의
IMAGE_LOCK_FILE = "/tmp/image_lock"

# 파일 잠금 획득 함수
def acquire_image_lock():
    lockfile_handle = open(IMAGE_LOCK_FILE, "w")
    fcntl.flock(lockfile_handle, fcntl.LOCK_EX)  # 배타적 잠금
    return lockfile_handle

# 파일 잠금 해제 함수
def release_image_lock(lockfile_handle):
    fcntl.flock(lockfile_handle, fcntl.LOCK_UN)
    lockfile_handle.close()

# 잠금 파일이 존재하지 않으면 생성
if not os.path.exists(IMAGE_LOCK_FILE):
    open(IMAGE_LOCK_FILE, 'w').close()

class ImgServ:
    def __init__(self):
        # Signal 핸들러 설정
        signal.signal(signal.SIGINT, self.sig_handler)
        signal.signal(signal.SIGTERM, self.sig_handler)
        
        # 공유 메모리 생성 또는 연결
        try:
            # 공유 메모리 생성
            self.shm = shared_memory.SharedMemory(create=True, size=SHM_SIZE, name=SHM_NAME)
            self.check = np.ndarray((SHM_SIZE,), dtype=np.uint8, buffer=self.shm.buf)
            self.check[0] = 0  # 플래그 초기화
            print(f"공유 메모리 '{SHM_NAME}'를 새로 생성하고 초기화했습니다.")
        except FileExistsError:
            # 공유 메모리가 이미 존재하면 연결
            self.shm = shared_memory.SharedMemory(name=SHM_NAME)
            self.check = np.ndarray((SHM_SIZE,), dtype=np.uint8, buffer=self.shm.buf)
            print(f"공유 메모리 '{SHM_NAME}'에 연결되었습니다.")
        
        # 기본 이미지 로드
        pimage_path = '/home/jetson/workspace/setting/aicar.png'
        if not os.path.exists(pimage_path):
            raise FileNotFoundError(f"기본 이미지 '{pimage_path}'을(를) 찾을 수 없습니다.")
        
        pimage = cv2.imread(pimage_path, cv2.IMREAD_COLOR)
        if pimage is None:
            raise FileNotFoundError(f"기본 이미지를 '{pimage_path}'에서 불러올 수 없습니다.")
        
        _, pjpeg = cv2.imencode('.jpg', pimage)
        self.default_frame = base64.b64encode(pjpeg.tobytes()).decode('utf-8')
        print(f"기본 이미지 로드 완료: {pimage.shape}")
        
        # 업데이트 타임아웃 설정 (초 단위)
        self.UPDATE_TIMEOUT = 10
        self.last_update_time = time.time()
        
        # 단일 클라이언트 연결 관리 변수
        self.connected = False
        self.client_ws: WebSocketServerProtocol = None
        
        # WebSocket 서버 주소 및 포트
        self.HOST = '0.0.0.0'
        self.PORT = 8765
    
    async def send_image_periodically(self):
        while True:
            if self.connected and self.client_ws is not None:
                current_time = time.time()
                
                lockfile_handle = acquire_image_lock()
                try:
                    flag = self.check[0]
                    print("read flag:", flag)
                    if flag == 1:
                        # 공유 메모리에서 이미지 데이터 추출
                        try:
                            image_data = self.check[1:].reshape((IMAGE_HEIGHT, IMAGE_WIDTH, IMAGE_CHANNELS))
                            ret, jpeg = cv2.imencode('.jpg', image_data)
                            if ret:
                                # JPEG 이미지를 Base64로 인코딩
                                encoded_image = base64.b64encode(jpeg.tobytes()).decode('utf-8')
                                # 클라이언트에게 인코딩된 이미지 전송
                                await self.client_ws.send(encoded_image)
                                print("Sent an image frame.")
                                self.last_update_time = current_time
                            self.check[0] = 0  # 플래그 초기화
                        except Exception as e:
                            print(f"이미지 처리 또는 전송 오류: {e}")
                            self.connected = False
                            self.client_ws = None
                    else:
                        # 타임아웃 검사
                        if current_time - self.last_update_time > self.UPDATE_TIMEOUT:
                            try:
                                # 기본 이미지를 클라이언트에게 전송
                                await self.client_ws.send(self.default_frame)
                                print("Sent default image due to timeout.")
                                self.last_update_time = current_time
                            except Exception as e:
                                print(f"기본 이미지 전송 오류: {e}")
                                self.connected = False
                                self.client_ws = None
                finally:
                    # 이미지 잠금 해제
                    release_image_lock(lockfile_handle)
            
            await asyncio.sleep(1 / 30)  # 약 30 FPS

    async def handler(self, websocket: WebSocketServerProtocol, path: str):
        if self.connected:
            # 이미 클라이언트가 연결되어 있는 경우 연결 거부
            await websocket.close()
            print("추가 클라이언트 연결 시도 거부됨.")
            return
        
        # 클라이언트 연결 수락
        self.connected = True
        self.client_ws = websocket
        self.last_update_time = time.time()
        print("클라이언트가 연결되었습니다.")
        
        # 초기 접속 시 기본 이미지 전송
        try:
            await websocket.send(self.default_frame)
            print("클라이언트에게 기본 이미지 전송 완료.")
        except Exception as e:
            print(f"기본 이미지 전송 오류: {e}")
            self.connected = False
            self.client_ws = None
        
        try:
            # 클라이언트가 연결을 종료할 때까지 대기
            await websocket.wait_closed()
        except websockets.exceptions.ConnectionClosed as e:
            print(f"클라이언트 연결 종료: {e}")
        finally:
            self.connected = False
            self.client_ws = None
            print("클라이언트 연결이 해제되었습니다.")
    
    async def main(self):
        # WebSocket 서버 시작
        server = await websockets.serve(self.handler, self.HOST, self.PORT)
        print(f"WebSocket 서버가 {self.HOST}:{self.PORT}에서 실행 중입니다.")
        
        # 이미지 전송 백그라운드 태스크 시작
        asyncio.create_task(self.send_image_periodically())
        
        # 서버가 종료되지 않도록 대기
        await server.wait_closed()
    
    def sig_handler(self, sig, frame):
        print("신호 수신, 종료 중...")
        try:
            self.shm.close()
            print("공유 메모리 닫기 완료.")
        except Exception as e:
            print(f"공유 메모리 닫기 오류: {e}")
        GPIO.cleanup()
        os._exit(0)
    
if __name__ == '__main__':
    imgserv = ImgServ()
    try:
        asyncio.run(imgserv.main())
    except KeyboardInterrupt:
        print("서버가 종료되었습니다.")
    finally:
        imgserv.shm.close()
        # 공유 메모리를 삭제하지 않음. 라이터 프로세스에서 계속 사용하도록 함.

