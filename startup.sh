#!/bin/bash

sleep 10

sudo nmcli connection modify Hotspot ipv4.addresses 192.168.5.1/24
#sudo nmcli connection modify Hotspot ipv4.gateway 192.168.10.1
sudo nmcli connection modify Hotspot ipv4.method manual

sudo nmcli con up Hotspot
sleep 5 
sudo nmcli con up Hotspot

