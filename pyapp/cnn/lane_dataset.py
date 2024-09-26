#!/home/pi/myenv/bin/python3

import torch
import os
import glob

import uuid
import PIL.Image

import torch.utils.data

import subprocess

import cv2
import numpy as np

import torchvision.transforms as transforms

#640x480 , 320x240, 200x150

device = torch.device('cpu')


class cs_dataset(torch.utils.data.Dataset):

    TRANSFORMS = transforms.Compose([
    transforms.Resize((66, 200)),    # nvidia file size
    transforms.ToTensor(),
    transforms.Normalize([0.485, 0.456, 0.406], [0.229, 0.224, 0.225])
    ])

    def __init__(self, directory):
        super().__init__()

        self.directory = directory
        self.transform = self.TRANSFORMS
        self.refresh()

    def __len__(self):
        return len(self.annotations)


    def __getitem__(self, idx):

        ann = self.annotations[idx]
        img = cv2.imread(ann['image_path'], cv2.IMREAD_COLOR)

        height, width = img.shape[:2]

        bottom_img = img[height//2:,:]

        image = PIL.Image.fromarray(bottom_img)

        image = self.transform(image)

        x = (ann['angle'] / 900 ) # -1 left, +1 right  convert to -1 ~ 1 value

        return ann['image_path'], image, torch.Tensor([x]) #image full path, image, anlge label value


    def _parse(self, path):
        basename = os.path.basename(path)
        items = basename.split('.')
        items = items[0].split('_')
        angle = items[1]
        return int(angle)


    def refresh(self):
        self.annotations = []

        allimgs = glob.glob( os.path.join(self.directory, '**/*.jpg') )
        print(allimgs)

        for image_path in allimgs:
            angle = self._parse(image_path)
            self.annotations += [{
                'image_path': image_path,
                'angle': angle,
                }]


BATCH_SIZE = 1
if __name__ == "__main__" :


    dataset = cs_dataset('/home/pi/share/ls/r18')


    train_loader = torch.utils.data.DataLoader(
            dataset,
            batch_size=BATCH_SIZE,
            shuffle=True
        )
    cnt = 0
    print(len(dataset))


    for img_name, images, angles in iter(train_loader):  # spip the image display

        print(cnt,  img_name,    angles * 900)
        cnt += 1

        if cnt == 10:
            break



