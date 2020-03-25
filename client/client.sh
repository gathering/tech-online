#!/bin/bash
check() {
	ping -c1 -W1 10.1.99.1 > /dev/null 2>&1
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
