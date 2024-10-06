#!/usr/bin/python3

from markx.aimark import aiMark
import cv2
import time
import glob

class mark_control:

    def __init__(self):
        self.aimark = aiMark()


    def load_model(self):
        self.aimark.load_model("mark.pt")


    def det(self, img):
        _val = self.aimark.img_to_mark(img)

        return _val


        
if __name__ == "__main__":

    aimark = mark_control()

    aimark.load_model()

    imgs = glob.glob("/home/jetson/share/mark/**/*.jpg")

    img = cv2.imread(imgs[0])

    elap = time.time()

    for _ in range(10):

        elap = time.time()
        val = aimark.det(img)
        elap = time.time() - elap
        print(elap)
        print(val)


