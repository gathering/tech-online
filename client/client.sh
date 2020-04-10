#!/bin/bash

target=8.8.8.8
check() {
	ping -c1 -W1 ${target} > /dev/null 2>&1
}

fig="figlet -W -w $COLUMNS -c "

ok() {
	setterm --blink off
	setterm --background green --bold on --foreground white
	clear
	$fig "WE GET SIGNAL"
}

bad() {
	setterm --background red --bold on --foreground white --blink on
	clear
	$fig "Somebody set up us the bomb"
}

while sleep 1; do
	check && ok || bad
	$fig $(date +%T)
done
