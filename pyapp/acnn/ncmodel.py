#!/home/pi/myenv/bin/python

import torch
import torch.nn as nn
import torch.nn.functional as F

class ncModel(nn.Module):

    def __init__(self):
        super(ncModel, self).__init__()
        # Convolutional layers (adjust input channels to 1 for grayscale)
        self.conv1 = nn.Conv2d(1, 24, kernel_size=5, stride=2)  # 5x5 conv, stride 2, 1 input channel for grayscale
        self.conv2 = nn.Conv2d(24, 36, kernel_size=5, stride=2) # 5x5 conv, stride 2
        self.conv3 = nn.Conv2d(36, 48, kernel_size=5, stride=2) # 5x5 conv, stride 2
        self.conv4 = nn.Conv2d(48, 64, kernel_size=3)           # 3x3 conv
        self.conv5 = nn.Conv2d(64, 64, kernel_size=3)           # 3x3 conv

        # Fully connected layers
        self.fc1 = nn.Linear(64 * 1 * 18, 100)  # Adjusted size based on Conv layer output
        self.fc2 = nn.Linear(100, 50)
        self.fc3 = nn.Linear(50, 10)
        self.fc4 = nn.Linear(10, 1)  # Output layer (steering angle)

        # Dropout
        self.dropout = nn.Dropout(0.5)

    def forward(self, x):
        # Pass through convolutional layers
        x = F.relu(self.conv1(x))
        x = F.relu(self.conv2(x))
        x = F.relu(self.conv3(x))
        x = F.relu(self.conv4(x))
        x = F.relu(self.conv5(x))

        # Flatten the tensor
        x = x.view(x.size(0), -1)

        # Pass through fully connected layers
        x = F.relu(self.fc1(x))
        x = F.relu(self.fc2(x))
        x = F.relu(self.fc3(x))
        x = self.fc4(x)  # Output is the steering angle (regression task)

        return x


if __name__ == "__main__":
    # Example usage
    model = ncModel()

    # Example input (batch size = 1, 1 channel (grayscale), 66x200 image size)
    x = torch.randn(1, 1, 66, 200)  # Grayscale image input (1 channel)
    output = model(x)
    print(output)


