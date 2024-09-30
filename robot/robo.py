#!/usr/bin/python3

import time
import fcntl
import os
import cv2
import numpy as np
from multiprocessing import shared_memory
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
def acquire_lock(lockfile):
    lockfile_handle = open(lockfile, "w")
    fcntl.flock(lockfile_handle, fcntl.LOCK_EX)  # 배타적 잠금
    return lockfile_handle

# 파일 잠금 해제 함수
def release_lock(lockfile_handle):
    fcntl.flock(lockfile_handle, fcntl.LOCK_UN)
    lockfile_handle.close()

class Writer:
    def __init__(self):
        # Signal 핸들러 설정
        signal.signal(signal.SIGINT, self.sig_handler)
        signal.signal(signal.SIGTERM, self.sig_handler)
        
        # 공유 메모리에 연결 시도 (재시도 로직 추가)
        while True:
            try:
                self.shm = shared_memory.SharedMemory(name=SHM_NAME)
                self.check = np.ndarray((SHM_SIZE,), dtype=np.uint8, buffer=self.shm.buf)
                print(f"공유 메모리 '{SHM_NAME}'에 성공적으로 연결되었습니다.")
                break
            except FileNotFoundError:
                print(f"공유 메모리 '{SHM_NAME}'를 찾을 수 없습니다. 리더(`imgserv.py`)가 먼저 실행되었는지 확인하세요.")
                print("5초 후 다시 시도합니다...")
                time.sleep(5)
        
        # 카메라 초기화
        self.cap = cv2.VideoCapture(0)  # 카메라 인덱스 조정 필요
        if not self.cap.isOpened():
            print("카메라를 열 수 없습니다.")
            self.cap = None
        else:
            print("카메라가 정상적으로 열렸습니다.")
        
        # 이미지 저장 디렉토리 초기화
        self.sdir = "lane0"
        self.idiv = 3
        self.cspeed = 20
        self.asens = 1
        self.save_dir = os.path.join("/home/jetson/share/ls", self.sdir)
        os.makedirs(self.save_dir, exist_ok=True)
        print(f"이미지 저장 디렉토리: {self.save_dir}")
        
        # 프레임 카운터 초기화
        self.frame_count = 0
        self.save_count = 0
    
    def get_img(self):
        if self.cap is None:
            return None
        for _ in range(10):
            ret, frame = self.cap.read()
            if not ret:
                print("프레임을 가져올 수 없습니다.")
                time.sleep(0.05)
                continue
            # 이미지 크기 재조정
            frame = cv2.resize(frame, (IMAGE_WIDTH, IMAGE_HEIGHT))
            return frame
        return None
    
    def dis_img(self, img):
        # 이미지 공유 메모리에 쓰기 전에 잠금 획득
        lockfile_handle = acquire_lock(IMAGE_LOCK_FILE)
        try:
            if self.check[0] == 0:
                # 공유 메모리에 이미지 쓰기 (인덱스 1부터 시작)
                self.check[1:] = img.reshape(-1)
                self.check[0] = 1  # 플래그 설정
                print("이미지를 공유 메모리에 썼습니다.")
        except Exception as e:
            print(f"공유 메모리에 이미지 쓰기 오류: {e}")
        finally:
            # 이미지 잠금 해제
            release_lock(lockfile_handle)
    
    def run(self):
        while True:
            img = self.get_img()
            if img is not None:
                self.dis_img(img)
                # 매 idiv번째 프레임을 저장
                self.frame_count += 1
                if self.frame_count % self.idiv == 0 and self.cspeed != 0:
                    filename = f"{self.save_count:03d}_{self.angle:03d}.jpg"
                    filepath = os.path.join(self.save_dir, filename)
                    cv2.imwrite(filepath, img)
                    print(f"프레임 저장: {filepath}")
                    self.save_count += 1
            time.sleep(0.1)  # 10 FPS
    
    def sig_handler(self, sig, frame):
        print("신호 수신, 종료 중...")
        if self.cap:
            self.cap.release()
            print("카메라 해제 완료.")
        try:
            self.shm.close()
            print("공유 메모리 닫기 완료.")
        except Exception as e:
            print(f"공유 메모리 닫기 오류: {e}")
        GPIO.cleanup()
        os._exit(0)
    
    # 모터 제어 함수 등 추가 가능
    
if __name__ == "__main__":
    print("로봇이 시작되었습니다.")
    writer = Writer()
    writer.run()

