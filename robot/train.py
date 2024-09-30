#!/usr/bin/python3

import time
import glob
import subprocess

class aiTrain:

    def __init__(self):

        pass

    def lane(self, epoch):

        # 명령어를 /bin/bash로 실행하도록 설정
        cmd = f"source /home/jetson/.bashrc && cd /home/jetson/workspace/robot/lanex && python3 train.py --epochs={epoch}"
        # 괄호를 올바르게 수정
        subprocess.run(["/bin/bash", "-c", cmd], shell=False)

    def mark(self, epoch):

        # 명령어를 /bin/bash로 실행하도록 설정
        cmd = f"source /home/jetson/.bashrc && cd /home/jetson/workspace/robot/markx && python3 train.py --epochs={epoch}"
        # 괄호를 올바르게 수정
        subprocess.run(["/bin/bash", "-c", cmd], shell=False)

        
if __name__ == "__main__":

    train = aiTrain()

    train.lane(2)
    #train.mark(2)


