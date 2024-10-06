#!/usr/bin/python3

import glob
import cv2
import time
import os

import torchvision.transforms as transforms
import torch.nn.functional as F
import cv2
import PIL.Image
import numpy as np

import torch
import torchvision

import atexit

import torchvision.models as models
from torchvision.models import ResNet18_Weights

from markx.mkmodel import mkModel


working_dir = '/home/jetson/share/models/'

output_dim = 1   # angle coordinate for each category

class aiMark():

    def __init__(self):

        #lsmodel

        self.model = mkModel()

        self.device = torch.device('cuda')

        self.transforms = transforms.Compose([
            transforms.Grayscale(num_output_channels=1),
            transforms.Resize((64, 100)),
            transforms.ToTensor(),
            transforms.Normalize([0.5], [0.5])
        ])


    def preprocess(self,image):

        # OpenCV 이미지를 PIL 이미지로 변환 (ColorJitter를 위해 필요)
        image = PIL.Image.fromarray(cv2.cvtColor(image, cv2.COLOR_BGR2RGB))
        
        # Transform 적용
        image = self.transforms(image)
        # 배치 차원 추가 ([N, C, H, W] 형식으로 만들기 위해)
        image = image.unsqueeze(0).to(self.device)
        return image


    def load_model(self, file):

        self.model.load_state_dict( torch.load( working_dir + file, weights_only=True))

        self.model = self.model.to(self.device)
        self.model.eval()


    def img_to_mark(self,image):

        image = self.preprocess(image)
        output = self.model(image)

         # 가장 높은 점수를 가진 클래스 인덱스 추출
        _, predicted_class = torch.max(output, 1)

        # 정수로 반환
        return predicted_class.item()



if __name__ == '__main__' :


    imgs = glob.glob("/home/jetson/share/mark/**/*.jpg")

    aimark = aiMark()

    print('load model')

    aimark.load_model('mark.pt')

    for index, fname in enumerate(imgs):

        img = cv2.imread(fname)

        elaps = time.time()
        mark = aimark.img_to_mark(img)
        print(mark)

        elaps = time.time() - elaps

        print(f'mark = {mark}, {fname}, {os.path.basename(fname)}, {elaps}')

        if index > 5 :
            break


