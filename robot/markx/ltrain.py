#!/usr/bin/python3

import torch
import torch.nn.functional as F
import time
import os
import argparse
import re

from lane.lsmodel import lsModel
from lane.dset import ls_dataset

def train_model(epochs_no, batch_no):


    dir_path = "/home/jetson/share/ls"
    dataset = ls_dataset(dir_path)
    device = torch.device('cuda')  # If you have a GPU, you can use 'cuda' instead of 'cpu'
    output_dim = 1  # angle coordinate for each category

    model = lsModel()
    model = model.to(device)

    optimizer = torch.optim.Adam(model.parameters())

    train_loader = torch.utils.data.DataLoader(
        dataset,
        batch_size=batch_no,
        shuffle=True
    )

    model.train()  # Set model to training mode

    # List to store the loss for each epoch
    epoch_losses = []
    epoch_accuracies=[]

    threshold = 5 


    for epoch in range(epochs_no):

        running_loss = 0.0  # To accumulate loss over the epoch

        total = 0
        count = 0  # Track number of processed samples
        correct = 0

        elaps = time.time()  # Track the time taken per epoch

        _cnt = 0
        for img_name, images, angles in train_loader:
            
            # Move data to the appropriate device (CPU or GPU)
            images = images.to(device)
            angles = angles.to(device)

            # Zero gradients of parameters
            optimizer.zero_grad()

            # Forward pass: compute model output
            outputs = model(images)

            # Compute loss (Mean Squared Error for regression)
            loss = F.mse_loss(outputs, angles)

            # Backward pass: compute gradients
            loss.backward()

            # Update parameters
            optimizer.step()

            # Accumulate loss
            running_loss += loss.item() * len(images)  # Multiply by batch size to get total loss for the batch
            count += len(images)


            # Calculate accuracy based on relative difference (percentage error)
            with torch.no_grad():  # No need to track gradients during accuracy computation
                relative_error = torch.abs(outputs - angles) * 45 
                correct += (relative_error < threshold).sum().item()  # Count predictions within threshold
                total += len(images)  # Update total number of predictions

            print('.', end="")

        print(".")


        # Compute average loss for the epoch
        avg_loss = running_loss / count
        epoch_losses.append(avg_loss)

        
        accuracy = correct / total if total > 0 else 0.0 # Avoid division by zero
        epoch_accuracies.append(accuracy)


        # Output loss and time taken for the epoch
        elaps = time.time() - elaps
        print(f'Epoch [{epoch + 1}/{epochs_no}], Loss: {avg_loss:.4f}, Time: {elaps:.2f} sec')

    return model, epoch_losses , epoch_accuracies


if __name__ == "__main__":
    # Argument parsing
    parser = argparse.ArgumentParser(description='arginput')

    parser.add_argument('--epochs', type=int, default=2)
    parser.add_argument('--batch', type=int, default=20)
    parser.add_argument('--out', type=str, default="models/lane.pt")

    args = parser.parse_args()

    batch = args.batch
    epochs = args.epochs
    out = args.out

    print(f'batch = {batch}, epochs = {epochs}')

    xdir = '/home/jetson/share/'
    out = re.sub(r'^/', '', out)  # Remove leading '/' if present
    fname = os.path.join(xdir, out)  # Combine directory and filename

    directory = os.path.dirname(fname)
    if not os.path.exists(directory):
        os.makedirs(directory)
        print(f"Directory '{directory}' created.")
    else:
        print(f"Directory '{directory}' already exists.")

    print('start training')

    # Train the model and get epoch losses
    model, epoch_losses, epoch_accuracies = train_model(epochs, batch)

    # Save the model
    torch.save(model.state_dict(), fname)

    # Plot the training loss over epochs using matplotlib
    import matplotlib.pyplot as plt

    plt.plot(epoch_losses, label='Training Loss')
    plt.title('Training Loss over Epochs')
    plt.xlabel('Epoch')
    plt.ylabel('Loss')
    plt.legend()
    plt.savefig("/home/jetson/share/out/lane/loss.png")
    plt.close()

    plt.plot(epoch_accuracies, label='Training Accuracy')
    plt.title('Training Accuracy over Epochs')
    plt.xlabel('Epoch')
    plt.ylabel('Accuracy(%)')
    plt.legend()
    plt.savefig("/home/jetson/share/out/lane/acc.png")
    plt.close()

