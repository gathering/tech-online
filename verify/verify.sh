
core=10.1.200.1
distro=10.1.200.2
e0=10.1.200.6
e1=10.1.200.10

declare -A mgmt_ip
mgmt_ip[core]=10.1.200.1
mgmt_ip[distro]=10.1.200.2
mgmt_ip[edge0]=10.1.200.6
mgmt_ip[edge1]=10.1.200.10
mgmt_ok=""
mgmt_bad=""

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

test_mgmt() {
	ssh $1 show system uptime | grep -q  Time
	ret=$?
	state "$ret" "SSH to $1 $2"
	if [ $ret = 0 ]; then
		mgmt_ok="${mgmt_ok} $1 "
	fi
	return $ret
}

mgmt_ok() {
	echo "$mgmt_ok" | egrep -q " $1 "
}

remote_ping() {
	src=$1
	target=$2
	comment=$3

	if mgmt_ok ${mgmt_ip[$src]}; then	
		ssh ${mgmt_ip[$src]} ping count 2 wait 1 $target 2>&1 | egrep -q '\s0% packet loss'
		ret=$?
		state "$ret" "Ping from $src to $target $comment"
		return $ret
	else
		echo "[ skip ] Skipped (no functional mgmt connection to $src)"
		return 0
	fi
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
	header "Testing management"
	for a in core distro edge0 edge1; do
		mping ${mgmt_ip[$a]} "$a" && test_mgmt ${mgmt_ip[$a]} $a
	done
	do_hint hint_mgmt
}



link_test() {
	aside=$1
	aname=$2
	bside=$3
	bname=$4
	fname="$2-$4"
	mping $aside "$fname: $aname global"
	mping $bside "$fname: $bname global"
	remote_ping $aname $bside "$fname: $aname from $bname" 
	remote_ping $bname $aside "$fname: $bname from $aname" 
}
linkp() {
	header "Pinging linknets"
	link_test 10.1.200.1 core 10.1.200.2 distro
	link_test 10.1.200.5 distro 10.1.200.6 edge0
	link_test 10.1.200.9 distro 10.1.200.10 edge1
	do_hint hint_link
}

laptop() {
	header "Pinging participant"
	mping 10.1.100.1 "edge0 gateway-ip"
	mping 10.1.100.2 "edge0 - participant"
	remote_ping edge0 10.1.100.1 "edge0 - gw ip - locally from edge0"
	remote_ping edge0 10.1.100.2 "edge0 - client ip - locally from edge0"
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
	remote_ping core 10.1.200.2 "core-distro linknet - distro-side"
}

mgmt
if [ $USER = "kly" ]; then
	core_ping
	lacp_core
fi
linkp
laptop
