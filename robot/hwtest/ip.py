#!/usr/bin/python3

import psutil
import socket

def get_all_interfaces():
    # 네트워크 인터페이스 정보 가져오기
    interfaces = psutil.net_if_addrs()
    interface_info = {}

    for interface_name, interface_addresses in interfaces.items():
        for address in interface_addresses:
            # IPv4 주소인 경우만 가져오기
            if address.family == socket.AF_INET:
                interface_info[interface_name] = address.address

    return interface_info

# 모든 네트워크 인터페이스와 IP 주소 출력
interfaces = get_all_interfaces()
for interface, ip_address in interfaces.items():
    print(f"인터페이스: {interface}, IP 주소: {ip_address}")


if 'wlan0' in interfaces :
    print( interfaces['wlan0']  )
elif 'l4tbr0' in interfaces :
    print(interfaces['l4tbr0'])
else:
    print("end")
