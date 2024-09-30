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

from lanex.lsmodel import lsModel


working_dir = '/home/jetson/share/models/'

output_dim = 1   # angle coordinate for each category

class aiLane():

    def __init__(self):

        #lsmodel

        self.model = lsModel()

        self.device = torch.device('cuda')

        self.transforms = transforms.Compose([
            transforms.Grayscale(num_output_channels=1),
            transforms.Resize((32, 100)),
            transforms.ToTensor(),
            transforms.Normalize([0.5], [0.5])
        ])


    def preprocess(self,image):

        # upper image cut
        height, width = image.shape[:2]
        image = image[height//2:,:]

        # OpenCV 이미지를 PIL 이미지로 변환 (ColorJitter를 위해 필요)
        image = PIL.Image.fromarray(cv2.cvtColor(image, cv2.COLOR_BGR2RGB))
        
        # Transform 적용
        image = self.transforms(image)
        # 배치 차원 추가 ([N, C, H, W] 형식으로 만들기 위해)
        image = image.unsqueeze(0).to(self.device)
        return image


    def load_model(self, file):

        self.model.load_state_dict( torch.load( working_dir + file, weights_only=True))

        #self.model.load_state_dict(torch.load(file))

        self.model = self.model.to(self.device)
        self.model.eval()


    def img_to_angle(self,image):

        image = self.preprocess(image)

        output = self.model(image)

        x = float(output[0])
        angle = int( x * 45)
        return int(angle)



if __name__ == '__main__' :

    imgs = glob.glob("/home/jetson/share/ls/r18/**/*.jpg")

    print(imgs)

    img = cv2.imread(imgs[0])
    det = lane_det_nc()

    print('load model')
    det.load_model('cnc.pt')

    for index, fname in enumerate(imgs):

        img = cv2.imread(fname)

        elaps = time.time()
        angle = det.img_to_angle(img)

        elaps = time.time() - elaps

        print(f' angle = {angle} {os.path.basename(fname)} , {elaps}, {fname}')


        if index > 100 :
            break



