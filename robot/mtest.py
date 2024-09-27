#!/usr/bin/python3

#!/usr/bin/python3

import time
from Adafruit_MotorHAT import Adafruit_MotorHAT, Adafruit_DCMotor
import Adafruit_GPIO.I2C as I2C
from smbus2 import SMBus  # I2C 버스를 열고 닫기 위한 smbus2 사용
import fcntl  # 파일 잠금을 위한 fcntl 모듈

# 잠금을 위한 파일 생성
LOCK_FILE = "/tmp/i2c_bus_lock"

# Jetson Nano에서는 I2C 버스를 직접 지정
I2C.get_default_bus = lambda: 1  # i2c-1 버스를 사용

# Motor HAT 객체 생성
mh = Adafruit_MotorHAT(addr=0x60)

# 프로그램 종료 시 모터를 정지하는 함수
def turnOffMotors():
    mh.getMotor(1).run(Adafruit_MotorHAT.RELEASE)
    mh.getMotor(2).run(Adafruit_MotorHAT.RELEASE)

# 모터 초기화
leftMotor = mh.getMotor(1)  # 좌측 모터
rightMotor = mh.getMotor(2)  # 우측 모터

# 모터 속도 및 방향 제어 함수
def set_motor_speed(left_speed, right_speed):
    # 좌측 모터 속도 설정 (0 ~ 255)
    if left_speed >= 0:
        leftMotor.run(Adafruit_MotorHAT.FORWARD)
    else:
        leftMotor.run(Adafruit_MotorHAT.BACKWARD)
    leftMotor.setSpeed(abs(int(left_speed * 255)))

    # 우측 모터 속도 설정 (0 ~ 255)
    if right_speed >= 0:
        rightMotor.run(Adafruit_MotorHAT.FORWARD)
    else:
        rightMotor.run(Adafruit_MotorHAT.BACKWARD)
    rightMotor.setSpeed(abs(int(right_speed * 255)))

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

# 메인 프로그램
def main():
    speed = 0.2

    for i in range(10):  # 10번 루프 실행
        print(f"루프 {i+1} / 10")

        # 파일 잠금 획득
        lockfile_handle = acquire_lock(LOCK_FILE)

        # I2C 버스 열기
        i2c_bus = open_i2c_bus()

        # 전진
        print("전진 중...")
        set_motor_speed(speed, speed)  # 전진
        time.sleep(1)  # 1초 동안 전진

        # 후진
        print("후진 중...")
        set_motor_speed(-speed, -speed)  # 후진
        time.sleep(1)  # 1초 동안 후진

        # 모터 정지
        turnOffMotors()

        # I2C 버스 닫기
        close_i2c_bus(i2c_bus)

        # 파일 잠금 해제
        release_lock(lockfile_handle)

        # 루프 간의 짧은 대기
        time.sleep(0.5)

    print("작업 완료.")

if __name__ == "__main__":
    main()


