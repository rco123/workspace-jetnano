#!/usr/bin/python3

import time
import board
import busio
from PIL import Image, ImageDraw, ImageFont
import adafruit_ssd1306
import fcntl  # 파일 잠금을 위한 fcntl 모듈

import psutil
import socket


# 잠금을 위한 파일 경로
LOCK_FILE = "/tmp/i2c_bus_lock"

# 파일 잠금 함수 (I2C 버스 접근을 동기화하기 위한 방법)
def acquire_lock(lockfile):
    lockfile_handle = open(lockfile, "w")  # 쓰기 모드로 파일 열기
    fcntl.flock(lockfile_handle, fcntl.LOCK_EX)  # 배타적 잠금
    return lockfile_handle

# 파일 잠금 해제 함수
def release_lock(lockfile_handle):
    fcntl.flock(lockfile_handle, fcntl.LOCK_UN)  # 잠금 해제
    lockfile_handle.close()  # 파일 닫기

# Jetson Nano의 I2C 버스 1번을 명시적으로 설정
i2c = busio.I2C(board.SCL, board.SDA)  # I2C 버스 1번


lockfile_handle = acquire_lock(LOCK_FILE)
try:
    # SSD1306 디스플레이 초기화 (I2C 주소 0x3C 사용)
    oled = adafruit_ssd1306.SSD1306_I2C(128, 32, i2c, addr=0x3C)
finally:
    # 파일 잠금 해제
    release_lock(lockfile_handle)



# I2C 접근을 동기화하여 OLED에 텍스트를 출력하는 함수
def update_oled_display(ipadd):
    # I2C 버스에 접근하기 전에 파일 잠금 획득
    lockfile_handle = acquire_lock(LOCK_FILE)

    try:
        # 디스플레이 지우기
        #oled.fill(0)
        #oled.show()

        # 이미지 객체 생성 (1비트 모드)
        image = Image.new('1', (oled.width, oled.height))

        # 이미지를 그리기 위한 객체 생성
        draw = ImageDraw.Draw(image)

        # 화면 지우기
        draw.rectangle((0, 0, oled.width, oled.height), outline=0, fill=0)

        # 폰트 설정
        #font = ImageFont.load_default()

        # 큰 폰트 설정 (트루타입 폰트 사용)
        font_path = "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf"  # 경로 수정 가능
        font_size = 12  # 원하는 폰트 크기 설정
        font = ImageFont.truetype(font_path, font_size)

        draw.text((0, 0), f"RCO AI BOT", font=font, fill=255)
        draw.text((0, 20), f"IP: {ipadd}", font=font, fill=255)

        # 이미지 버퍼에 그린 내용을 SSD1306에 표시
        oled.image(image)
        oled.show()

        # 2초 대기
        time.sleep(2)


    finally:
        # 파일 잠금 해제
        release_lock(lockfile_handle)



def get_all_interfaces():
    # 네트워크 인터페이스 정보 가져오기
    interfaces = psutil.net_if_addrs()
    stats = psutil.net_if_stats()

    interface_info = {}

    for interface_name, interface_addresses in interfaces.items():

        # 인터페이스가 활성화되어 있는지 확인 (isup=True)
        if stats[interface_name].isup:
            for address in interface_addresses:
                # IPv4 주소인 경우만 가져오기
                if address.family == socket.AF_INET:
                    interface_info[interface_name] = address.address

    for interface, ip_address in interface_info.items():
        print(f"인터페이스: {interface}, IP 주소: {ip_address}")

    if 'wlan0' in interface_info :
        print( interface_info['wlan0'])
        return interface_info['wlan0']  
    elif 'l4tbr0' in interface_info :
        print(interface_info['l4tbr0'])
        return interface_info['l4tbr0']
    else:
        return "127.0.0.1"


if __name__ == "__main__":
    # OLED 디스플레이 업데이트
    cnt = 1
    while True:

        print("update")

        ipadd = get_all_interfaces()
        update_oled_display(ipadd)

        cnt+=1
        time.sleep(2)



