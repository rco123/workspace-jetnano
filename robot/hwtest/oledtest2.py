#!/usr/bin/python3

import time
from smbus2 import SMBus
from PIL import Image, ImageDraw, ImageFont

# I2C 버스 번호와 OLED 주소 설정
I2C_BUS = 1  # Jetson Nano의 기본 I2C 버스는 보통 1입니다 (/dev/i2c-1)
OLED_ADDR = 0x3C  # OLED 디스플레이의 I2C 주소 (일반적으로 0x3C 또는 0x3D)

# SMBus 객체 생성
i2c = SMBus(I2C_BUS)

# SSD1306 명령어 (128x32 해상도에 맞게 조정)
SSD1306_INIT = [
    0xAE,         # Display off
    0x20, 0x00,   # Set Memory Addressing Mode (0x00 = Horizontal Addressing Mode)
    0xB0,         # Set Page Start Address for Page Addressing Mode, 0-3
    0xC8,         # Set COM Output Scan Direction
    0x00,         # Set low column address
    0x10,         # Set high column address
    0x40,         # Set start line address
    0x81, 0x7F,   # Set contrast control register
    0xA1,         # Set segment re-map 0 to 127
    0xA6,         # Set normal display (A7 for inverse)
    0xA8, 0x1F,   # Set multiplex ratio (1 to 32)
    0xA4,         # Output follows RAM content
    0xD3, 0x00,   # Set display offset
    0xD5, 0x80,   # Set display clock divide ratio/oscillator frequency
    0xD9, 0x22,   # Set pre-charge period
    0xDA, 0x02,   # Set com pins hardware configuration
    0xDB, 0x20,   # Set vcomh (0x20 = 0.77*Vcc)
    0x8D, 0x14,   # Enable charge pump regulator
    0xAF          # Turn on the display (0xAF = on, 0xAE = off)
]

# I2C 명령어 전송 함수
def oled_command(cmd):
    i2c.write_byte_data(OLED_ADDR, 0x00, cmd)

# I2C 명령어 리스트 전송 함수
def oled_command_list(cmds):
    for cmd in cmds:
        oled_command(cmd)

# SSD1306 초기화
oled_command_list(SSD1306_INIT)

# 화면 초기화 함수
def clear_display():
    for page in range(4):  # 128x32 디스플레이는 4개의 페이지를 사용
        oled_command(0xB0 + page)  # Set page address
        oled_command(0x00)  # Set lower column address
        oled_command(0x10)  # Set higher column address
        for _ in range(128):  # 각 페이지의 128개의 열을 모두 지움
            i2c.write_byte_data(OLED_ADDR, 0x40, 0x00)  # Clear display (0x40 = data mode)

# 디스플레이에 이미지 그리기 함수
def display_image(image):
    # 이미지를 1-bit 형식으로 변환
    image = image.convert("1")
    pixel_data = list(image.getdata())
    width, height = image.size

    # 페이지 단위로 데이터를 전송
    for page in range(4):  # 128x32 디스플레이는 4개의 페이지(8픽셀 높이)를 사용
        oled_command(0xB0 + page)  # 페이지 설정
        oled_command(0x00)  # Lower column start address
        oled_command(0x10)  # Higher column start address
        for x in range(128):  # 각 열에 대한 데이터 전송
            byte = 0
            for bit in range(8):  # 각 열의 8픽셀 데이터를 한 바이트로 묶음
                y = page * 8 + bit
                if y < height and x < width and pixel_data[y * width + x] == 255:
                    byte |= (1 << bit)
            i2c.write_byte_data(OLED_ADDR, 0x40, byte)  # 데이터 전송 (0x40 = data mode)

# 화면 지우기
clear_display()

# 이미지 생성
width = 128
height = 32
image = Image.new("1", (width, height))
draw = ImageDraw.Draw(image)

# 텍스트 출력
font = ImageFont.load_default()
draw.text((0, 0), "Line 1: Hello!", font=font, fill=255)
draw.text((0, 11), "Line 2: Jetson Nano", font=font, fill=255)
draw.text((0, 22), "Line 3: OLED Test", font=font, fill=255)

#draw.text((0, 0), "Line 1: Hello!", font=font, fill=255)
#draw.text((0, 8), "Line 2: This is", font=font, fill=255)
#draw.text((0, 16), "Line 3: Jetson Nano", font=font, fill=255)
#draw.text((0, 24), "Line 4: OLED Test", font=font, fill=255)
#
# OLED에 이미지 출력
display_image(image)

# 5초 대기
time.sleep(10)

# 디스플레이 지우기
clear_display()

# I2C 연결 해제
i2c.close()

