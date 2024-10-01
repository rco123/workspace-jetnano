#!/usr/bin/python3

from train import train_control


if __name__ == "__main__":

    train = train_control()
    train.lane(epoch=2)
    #train.mark(epoch=2)
