#!/usr/bin/python3

from robo import robot_control


if __name__ == "__main__":

    robo = robot_control()

    while True:
       img =  robo.get_img()
       robo.dis_img(img)
       robo.delay(0.1)
