#!/bin/bash

sudo apt-get -y install figlet xfce4-terminal

while sleep 1; do
DISPLAY=:0.0 xfce4-terminal --fullscreen --hide-toolbar --hide-scrollbar --hide-borders --hide-menubar --zoom=4 -x ./client.sh
done
