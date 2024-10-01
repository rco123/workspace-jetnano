#!/usr/bin/python3

from robo import robot_control

if __name__ == "__main__":

    robo = robot_control()

    robo.dir_clean(dir="lane0")
    robo.hp_con(sdir="lane0",cspeed=20,idiv=2,asens=1)


