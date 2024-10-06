#!/usr/bin/python3

import time
import board  # Blinka에서 제공하는 Jetson Nano와 호환되는 I2C 인터페이스
import busio  # I2C 통신을 위한 모듈
from PIL import Image, ImageDraw, ImageFont
import adafruit_ssd1306  # Blinka 호환 SSD1306 라이브러리

# I2C 인터페이스 설정
i2c = busio.I2C(board.SCL, board.SDA)

print(i2c)

# SSD1306 OLED 디스플레이 설정 (128x64 해상도)
# 디스플레이 해상도가 128x32일 경우 SSD1306_I2C(128, 32, i2c)로 변경
disp = adafruit_ssd1306.SSD1306_I2C(128, 32, i2c)

print("get disp", disp)

# 디스플레이 초기화 및 지우기
disp.fill(0)
disp.show()

# 이미지 생성 (1-bit 색상)
width = disp.width
height = disp.height
image = Image.new('1', (width, height))

# 이미지를 그리기 위한 객체 생성
draw = ImageDraw.Draw(image)

# 검은색으로 초기화 (배경)
draw.rectangle((0, 0, width, height), outline=0, fill=0)

# 텍스트 출력 위치와 폰트 설정
font = ImageFont.load_default()
text = "Hello, Jetson Nano!"

# 텍스트 그리기
draw.text((0, 0), text, font=font, fill=255)

# 이미지를 OLED에 출력
disp.image(image)
disp.show()

print("show")

# 텍스트가 5초간 화면에 표시됨
time.sleep(5)

# 디스플레이 지우기
disp.fill(0)
disp.show()


