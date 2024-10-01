#!/usr/bin/python3

from robo import robot_control

if __name__ == "__main__":

    robo = robot_control()

    #robo.get_ip()
    #robo.conn_ap("ai123","")
    #robo.conn_ap("rco3d","sgkim123")
    robo.set_hotspot("192.168.5.1")

