#!/usr/bin/python3

import subprocess
import time

if False:

    # 10초 대기
    time.sleep(10)

    ipAddress = '192.168.5.2/24'

    # nmcli 명령을 실행하여 Hotspot 설정 변경
    subprocess.run(['sudo', 'nmcli', 'connection', 'modify', 'Hotspot', 'ipv4.addresses', ipAddress])
    # subprocess.run(['sudo', 'nmcli', 'connection', 'modify', 'Hotspot', 'ipv4.gateway', '192.168.5.1'])
    subprocess.run(['sudo', 'nmcli', 'connection', 'modify', 'Hotspot', 'ipv4.method', 'manual'])

    # Hotspot을 활성화
    subprocess.run(['sudo', 'nmcli', 'con', 'up', 'Hotspot'])

    # 5초 대기
    time.sleep(5)

    # Hotspot을 다시 활성화
    subprocess.run(['sudo', 'nmcli', 'con', 'up', 'Hotspot'])

