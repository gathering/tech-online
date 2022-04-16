#!/bin/bash

echo This is not tested as an actual script, more as a page of notes.
exit -1

# Log in as tech on the RPi.
id

# Install dependencies
sudo apt update
sudo apt install git libwww-perl

# Make sure participants can't access our secrets
chmod 700 $HOME

# Create the participant user
sudo adduser techo
sudo usermod -aG dialout techo

# Fix SSH keys, such that verify can connect to devices without password
# TODO

# Get the techo repo
git clone https://github.com/Gathering/tech-online
cd tech-online

# Setup verify
cd verify
echo "very-secret-token" > auth_token # Use cat with Ctrl+DD instead to avoid storing the password in the command history
chmod 600 auth_token
station_id=0 # Set this
screen -S "station-$station_id" -dm bash -c "while : ; do time timeout 60 ./verify $station_id ; done
