#!/usr/bin/python3

from robo import robot_control
from mark import mark_control

if __name__ == "__main__":

    robo = robot_control()
    aimark = mark_control()

    aimark.load_model()

    while True:

        img = robo.get_img() 

        mkno = aimark.det(img)

        print(f'mark no = {mkno}')

        robo.dis_img(img) 

        robo.delay(0.1)

