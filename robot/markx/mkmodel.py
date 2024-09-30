#!/usr/bin/python3

import torch
import torch.nn as nn
import torch.nn.functional as F

class mkModel(nn.Module):

    def __init__(self):
        super(mkModel, self).__init__()
        # Convolutional layers
        self.conv1 = nn.Conv2d(1, 24, kernel_size=5, stride=2)
        self.conv2 = nn.Conv2d(24, 36, kernel_size=5, stride=2)
        self.conv3 = nn.Conv2d(36, 48, kernel_size=5, stride=2)
        self.conv4 = nn.Conv2d(48, 64, kernel_size=3, padding=1)
        self.conv5 = nn.Conv2d(64, 64, kernel_size=3, padding=1)

        # Fully connected layers (updated input size based on Conv output)
        self.fc1 = nn.Linear(64 * 5 * 9, 100)  # Updated from 64*3*6 to 64*5*9
        self.fc2 = nn.Linear(100, 50)
        self.fc3 = nn.Linear(50, 10)
        self.fc4 = nn.Linear(10, 3)  # 3 output classes

        # Dropout
        self.dropout = nn.Dropout(0.5)

    def forward(self, x):
        # Pass through convolutional layers
        x = F.relu(self.conv1(x))
        x = F.relu(self.conv2(x))
        x = F.relu(self.conv3(x))
        x = F.relu(self.conv4(x))
        x = F.relu(self.conv5(x))

        # Check shape before flattening (for debugging)
        #print(f"Convolutional output shape: {x.shape}")

        # Flatten the tensor
        x = x.view(x.size(0), -1)

        # Pass through fully connected layers
        x = F.relu(self.fc1(x))
        x = F.relu(self.fc2(x))
        x = F.relu(self.fc3(x))
        x = self.fc4(x)

        return x


if __name__ == "__main__":
    # Example usage
    model = mkModel()

    # Example input (batch size = 1, 1 channel (grayscale), 64x100 image size)
    x = torch.randn(1, 1, 64, 100)  # Grayscale image input (1 channel)
    
    # Get the model output
    output = model(x)
    
    # Print the output
    print(output)

