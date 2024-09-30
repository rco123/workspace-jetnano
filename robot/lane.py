#!/usr/bin/python3

from lanex.ailane import aiLane
import cv2
import time

class lane_control:


    def __init__(self):
        self.ailane = aiLane()


    def load_model(self):
        self.ailane.load_model("lane.pt")


    def det(self, img):
        _val = self.ailane.img_to_angle(img)

        return _val

        
if __name__ == "__main__":

    ailane = lane_control()
    amodel = ailane.load_model()

    img = cv2.imread("/home/jetson/share/ls/lane0/000_020.jpg")

    elap = time.time()

    for _ in range(10):

        elap = time.time()
        val = ailane.det(img)
        elap = time.time() - elap
        print(elap)
        print(val)




