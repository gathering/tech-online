
core=10.1.99.1
distro=10.1.99.10
e0=10.1.99.100
e1=10.1.99.101

all="$core $distro $e0 $e1"
gfail=0
lfail=0

state() {
	ret=$1
	msg=$2
	if [ $ret != 0 ]; then
		echo -n '[ fail ] '
		lfail=$(( $lfail + 1 ))
	else
		echo -n '[  ok  ] '
	fi
	echo $2
}

mping() {
	ping -c1 -q -W 1 $1 2>&1 >/dev/null
	ret=$?
	state "$ret" "Ping of $1 $2"
	return $ret
}

remote_ping() {
	src=$1
	target=$2
	comment=$3
	ssh $src ping count 2 wait 1 $target 2>&1 | grep -q '0% packet loss'
	ret=$?
	state "$ret" "Ping from $src to $target $comment"
	return $ret
}


header() {
	echo " *****: $*"
	gfail=$(( $gfail + $lfail))
	lfail=0
}

do_hint() {
	if [ $lfail = 0 ]; then
		return 1
	fi
	echo -n 'Do you want a hint? y/[n]: '
	read hint
	if [ $hint = "y" ]; then
		cat $1
		echo
		echo "And remember: If in doubt: Ask on discord!"
		echo "(press enter to continue)"
		read
	fi
}

mgmt() {
	header "Pinging management"
	for a in $all; do
		mping $a
	done
	do_hint hint_mgmt
}

linkp() {
	header "Pinging linknets"
	mping 10.1.200.1 "core-distro: core-side"
	mping 10.1.200.2 "core-distro: distro-side"
	mping 10.1.200.5 "distro-edge0: distro-side"
	mping 10.1.200.6 "distro-edge0: edge-side"
	mping 10.1.200.9 "distro-edge1: distro-side"
	mping 10.1.200.10 "distro-edge1: edge-side"
	do_hint hint_link
}

laptop() {
	header "Pinging participant"
	mping 10.1.100.1 "edge0 gateway-ip"
	mping 10.1.100.2 "edge0 - participant"
	do_hint hint_participant
}

lacp_core() {
	header 'Checking for LACP packets on core-distro link'
	echo -n '[ xxxx ] Clearing counters...'
	ssh $core 'clear lacp statistics'
	echo -n 'Sleeping for a second or two...'
	sleep 2
	echo 'Checking...'
	lines=$(ssh $core  'show lacp statistics interfaces | display json ' | jq '."lacp-interface-statistics-list"[0]."lacp-interface-statistics"[0]."lag-lacp-statistics"[] | .name[0].data + " lacp-rx-packets: " + ."lacp-rx-packets"[0].data' | sed 's/"//g')
	echo -e "$lines" | awk '/\s+0$/ { exit 1 }; '
	ret=$?

	state "$ret" "LACP-check of core-distro interfaces"
	if [ $ret != 0 ]; then
		echo "No LACP packets received on at least one interface"
		echo -e "$lines"
	fi
	do_hint hint_lacp
}

core_ping() {
	header 'Ping from core'
	remote_ping $core 10.1.200.2 "core-distro linknet - distro-side"
}

if [ $USER = "kly" ]; then
	core_ping
	lacp_core
fi
mgmt
linkp
laptop
