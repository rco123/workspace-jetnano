#!/usr/bin/python3

from robo import robot_control
from lane import lane_control

if __name__ == "__main__":

    robo = robot_control()
    ailane = lane_control()

    ailane.load_model()

    while True:

        img = robo.get_img() 
        angle = ailane.det(img)

        print(f'angle = {angle}')

        robo.dis_img(img) 
        #robo.dis_img_ang(img, angle) 

        robo.delay(0.1)

