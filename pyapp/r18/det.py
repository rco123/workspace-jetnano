#!/home/pi/myenv/bin/python3

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


device = torch.device('cpu')
working_dir = '/home/pi/share/models/'

output_dim = 1   # angle coordinate for each category


class lane_det_r18():

    def __init__(self):

        # RESNET 18
        self.model = models.resnet18(weights=ResNet18_Weights.DEFAULT)
        self.model.fc = torch.nn.Linear(512, output_dim)

        self.device = "cpu"
        self.transforms = transforms.Compose([
            transforms.Resize((224, 224)),
            transforms.ToTensor(),
            transforms.Normalize([0.485, 0.456, 0.406], [0.229, 0.224, 0.225])
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

        #self.model.load_state_dict(torch.load(file))

        self.model = self.model.to(device)
        self.model.eval()


    def img_to_angle(self,image):

        image = image.copy()
        image[0:360-150:] = 0

        image = self.preprocess(image)

        output = self.model(image)
        x = float(output[0])
        angle = int( x * 900)
        return int(angle)



if __name__ == '__main__' :

    imgs = glob.glob("/home/pi/share/r18/**/*.jpg")

    print(imgs)

    img = cv2.imread(imgs[0])
    det = lane_det_r18()

    print('load model')
    det.load_model('r18.pt')

    for index, fname in enumerate(imgs):

        img = cv2.imread(fname)

        elaps = time.time()
        angle = det.img_to_angle(img)

        elaps = time.time() - elaps

        print(f' angle = {angle} {os.path.basename(fname)} , {elaps}, {fname}')


        if index > 20 :
            break



