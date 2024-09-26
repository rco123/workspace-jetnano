#!/home/pi/myenv/bin/python3


import sys
import re
import os
import argparse

import torch
import torchvision

import threading
import time
import torch.nn.functional as F

import torchvision.transforms as transforms
import torch.nn.functional as F
import cv2
import PIL.Image
import numpy as np

import torchvision.models as models
from torchvision.models import ResNet18_Weights

from lane_dataset import cs_dataset
from ncmodel import ncModel


def train_model( epochs_no, batch_no ):

    elaps = time.time()

    dir_path = "/home/pi/share/ls/r18"
    dataset = cs_dataset(dir_path)
    device = torch.device('cpu')
    output_dim = 1   # angle coordinate for each category

    # RESNET 18
    model = ncModel() 

    model = model.to(device)

    optimizer = torch.optim.Adam(model.parameters())


    train_loader = torch.utils.data.DataLoader(
        dataset,
        batch_size=batch_no,
        shuffle=True
    )


    model = model.train()


    while epochs_no > 0:

        i = 0
        sum_loss = 0.0
        error_count = 0.0
        
        elaps = time.time()

        for img_name, images, angles in iter(train_loader):

            # send data to device
            images = images.to(device)
            angles = angles.to(device)

            # zero gradients of parameters
            optimizer.zero_grad()

            # execute model to get outputs
            outputs = model(images)

            loss = F.mse_loss(outputs, angles)

            # run backpropogation to accumulate gradients
            loss.backward()
            # step optimizer to adjust parameters
            optimizer.step()


            # increment progress
            count = len(outputs.flatten())
            i += count

            progress = i / len(dataset)
            print(f'epoch ={epochs_no}, progress : {progress:.4f}, {i:04d} / {len(dataset):04d} batch_loss = {loss:.4f}')

        
        elaps = time.time() - elaps

        epochs_no = epochs_no - 1
        print(f'epoch time = {elaps}')

        
    return model


if __name__ == "__main__" :

     # 인자값을 받을 수 있는 인스턴스 생성
    parser = argparse.ArgumentParser(description='arginput')

    # 입력받을 인자값 설정 (default 값 설정가능)
    parser.add_argument('--epochs', type=int,   default=30)
    parser.add_argument('--batch',  type=int,   default=20)
    parser.add_argument('--out', type=str,   default="models/nc.pt")

    # args 에 위의 내용 저장
    args  = parser.parse_args()

    # 입력받은 인자값 출력
    print(args.batch)
    print(args.epochs)

    batch = args.batch
    epochs = args.epochs
    out = args.out

    print(f' batch = {batch}, epochs={epochs}')


    xdir = '/home/pi/share/'
    out = re.sub(r'^/','',out) # in case, first char "/", delete first "/" 
    fname = os.path.join(xdir, out)  # joint 2 string

    directory = os.path.dirname(fname)
    if not os.path.exists(directory):
        os.makedirs(directory)
        print(f"Directory '{directory}' created.")
    else:
        print(f"Directory '{directory}' already exists.")


    print('start training ')

    model = train_model( epochs, batch)
    torch.save(model.state_dict(), fname)


