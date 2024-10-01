#!/usr/bin/python3

from robo import robot_control

if __name__ == "__main__":

    robo = robot_control()

    robo.move(angle=5,speed=10)

    robo.delay(2)

    robo.stop()

