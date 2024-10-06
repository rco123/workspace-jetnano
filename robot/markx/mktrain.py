#!/usr/bin/python3

import torch
import torch.nn as nn
import torch.optim as optim
import torch.nn.functional as F
import time
import os
import argparse
import re

from torchvision import datasets, transforms
from torch.utils.data import DataLoader
import matplotlib.pyplot as plt

from markx.mkmodel import mkModel


def train_model(epochs_no, batch_no, dataset_loc, batch_size):

    # 데이터 전처리 정의
    trans = transforms.Compose([

        transforms.Grayscale(num_output_channels=1),  # 그레이스케일로 변환

        transforms.Resize((64, 100)),    # nvidia file size
        transforms.ToTensor(),
        transforms.Normalize([0.5], [0.5])
        ])

    # ImageFolder를 사용하여 데이터셋 로드
    dataset = datasets.ImageFolder(dataset_loc, transform=trans)

    # 클래스와 라벨 매핑 출력 (디버깅용)
    print("클래스와 라벨 매핑:", dataset.class_to_idx)

    # DataLoader 설정
    data_loader = DataLoader(dataset, batch_size=batch_size, shuffle=True, num_workers=4)

    device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')  # GPU 사용 가능 시 GPU 사용

    # 모델 초기화 및 장치로 이동
    num_classes = len(dataset.classes)
    model = mkModel().to(device)

    # 손실 함수 정의
    criterion = nn.CrossEntropyLoss()

    # 옵티마이저 정의 (예: Adam)
    optimizer = optim.Adam(model.parameters(), lr=0.001)

    model.train()  # Set model to training mode

    # List to store the loss for each epoch
    epoch_losses = []
    epoch_accuracies = []

    for epoch in range(epochs_no):

        running_loss = 0.0  # To accumulate loss over the epoch

        total = 0
        correct = 0

        elaps = time.time()  # Track the time taken per epoch

        for images, labels in data_loader:

            # Move data to the appropriate device (CPU or GPU)
            images = images.to(device)
            labels = labels.to(device)

            # Zero gradients of parameters
            optimizer.zero_grad()

            # Forward pass: compute model output
            outputs = model(images)

            # Compute loss (CrossEntropyLoss for classification)
            loss = criterion(outputs, labels)

            # Backward pass: compute gradients
            loss.backward()

            # Update parameters
            optimizer.step()

            # 손실 누적
            running_loss += loss.item() * images.size(0)

            # 예측된 클래스
            _, predicted = torch.max(outputs, 1)
            total += labels.size(0)
            correct += (predicted == labels).sum().item()

        # 에포크 당 평균 손실 및 정확도 계산
        epoch_loss = running_loss / len(dataset)
        epoch_acc = (correct / total) * 100

        print(f"Epoch [{epoch+1}/{epochs_no}], Loss: {epoch_loss:.4f}, Accuracy: {epoch_acc:.2f}%")

        # 손실 및 정확도 리스트에 추가
        epoch_losses.append(epoch_loss)
        epoch_accuracies.append(epoch_acc)

        # Output loss and time taken for the epoch
        elaps = time.time() - elaps
        print(f'Epoch [{epoch + 1}/{epochs_no}], Loss: {epoch_loss:.4f}, Accuracy: {epoch_acc:.2f}%, Time: {elaps:.2f} sec')

    return model, epoch_losses, epoch_accuracies

if __name__ == "__main__":
    # Argument parsing
    parser = argparse.ArgumentParser(description='Train mkModel with ImageFolder dataset')

    parser.add_argument('--epochs', type=int, default=2, help='number of training epochs')
    parser.add_argument('--batch', type=int, default=20, help='batch size')
    parser.add_argument('--out', type=str, default="models/mark.pt", help='output model path')

    args = parser.parse_args()

    batch = args.batch
    epochs = args.epochs
    out = args.out

    print('Start training')

    dataset_loc = "/home/jetson/share/mark"

    # Train the model and get epoch losses and accuracies
    model, epoch_losses, epoch_accuracies = train_model(epochs, batch, dataset_loc, batch)


    # Save the model
    model_save_path = os.path.join("/home/jetson/share", out)


    os.makedirs(os.path.dirname(model_save_path), exist_ok=True)  # Ensure directory exists
    torch.save(model.state_dict(), model_save_path)
    print(f"모델이 {model_save_path}에 저장되었습니다.")


    # Plot the training loss over epochs using matplotlib
    plt.figure()
    plt.plot(range(1, epochs + 1), epoch_losses, marker='o', label='Training Loss')
    plt.title('Training Loss over Epochs')
    plt.xlabel('Epoch')
    plt.ylabel('Loss')
    plt.legend()
    loss_plot_path = "/home/jetson/share/out/mark/loss.png"
    os.makedirs(os.path.dirname(loss_plot_path), exist_ok=True)  # Ensure directory exists
    plt.savefig(loss_plot_path)
    plt.close()
    print(f"손실 그래프가 {loss_plot_path}에 저장되었습니다.")

    # Plot the training accuracy over epochs using matplotlib
    plt.figure()
    plt.plot(range(1, epochs + 1), epoch_accuracies, marker='o', color='orange', label='Training Accuracy')
    plt.title('Training Accuracy over Epochs')
    plt.xlabel('Epoch')
    plt.ylabel('Accuracy (%)')
    plt.legend()
    acc_plot_path = "/home/jetson/share/out/mark/acc.png"
    os.makedirs(os.path.dirname(acc_plot_path), exist_ok=True)  # Ensure directory exists
    plt.savefig(acc_plot_path)
    plt.close()
    print(f"정확도 그래프가 {acc_plot_path}에 저장되었습니다.")

