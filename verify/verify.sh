#!/bin/bash

prefix="10.1."
start_time=$(date +%s)
hint_int=n
declare -A mgmt_ip
mgmt_ip[core]=${prefix}200.1
mgmt_ip[distro]=${prefix}200.2
mgmt_ip[edge0]=${prefix}200.6
mgmt_ip[edge1]=${prefix}200.10
mgmt_ok=""
mgmt_bad=""

gfail=0
lfail=0

ferdig=nope
t_header=""

s_n=0


json_out=$(mktemp)

cleanup() {
	runtime=$(( $(date +%s) - ${start_time} ))
	echo '}, "timestamp": "'$(date --iso-8601=seconds)'","runtime": '$runtime' }' >> ${json_out}
	if ! jq . < ${json_out} > /dev/null 2>&1; then
		echo 'bad json-output'
		ferdig=nope
	fi
	if [ $(wc -l < ${json_out}) -lt 15 ]; then
		echo 'too few lines in json-output'
		ferdig=nope
	fi
	if [ $ferdig = "yup" ]; then
		cp ${json_out} ${prefix}$(date --iso-8601=minute).json
		cp ${json_out} ${prefix}latest.json
		echo -n 'data = ' > ${prefix}jsonp
		cat ${json_out} >> ${prefix}jsonp
	fi
	rm ${json_out}
}

trap cleanup EXIT

echo '{ "tests": {' > ${json_out}
state() {
	ret=$1
	msg=$2
	s_n=$(( $s_n + 1 ))
	if [ $ret != 0 ]; then
		_state="fail"
		lfail=$(( $lfail + 1 ))
	else
		_state="ok"
	fi
	printf "[ %4s ] %s\n" "$_state" "$msg"
	comma=""
	if [ $s_n != 1 ]; then
		comma=","
	fi
	printf '%s"%d": { "test": "%s", "state": "%s", "header": "%s" }\n' "$comma" "$s_n" "$msg" "$_state" "$t_header" >> ${json_out}
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
	t_header="$*"
	gfail=$(( $gfail + $lfail))
	lfail=0
}

do_hint() {
	if [ $lfail = 0 ]; then
		return 1
	fi
	if [ $hint_int = "n" ]; then
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
	src=$1
	shift
	rest="$*"
	if mgmt_ok ${mgmt_ip[$src]}; then	
		ssh $src "$rest"
		return 0
	fi
	return 1
}

v_mgmt() {
	header "Management"
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
declare -A linknets
linknets[distro-core]="${prefix}200.1 core ${prefix}200.2 distro"
linknets[distro-edge0]="${prefix}200.5 distro ${prefix}200.6 edge0"
linknets[distro-edge1]="${prefix}200.9 distro ${prefix}200.10 edge1"

linkp() {
	header "Linknet"
	for a in ${!linknets[*]}; do
		link_test ${linknets[$a]}
	done
#	link_test ${prefix}200.1 core 10.1.200.2 distro
#	link_test ${prefix}200.5 distro 10.1.200.6 edge0
#	link_test ${prefix}200.9 distro 10.1.200.10 edge1
	do_hint hint_link
}

laptop() {
	header "Participant"
	mping ${prefix}100.1 "edge0 gateway-ip"
	mping ${prefix}100.2 "edge0 - participant"
	remote_ping edge0 ${prefix}100.1 "edge0 - gw ip - locally from edge0"
	remote_ping edge0 ${prefix}100.2 "edge0 - client ip - locally from edge0"
	do_hint hint_participant
}


lacp_core() {
	header 'LACP'
	echo -n '[ xxxx ] Clearing counters...'
	mgmt ${mgmt_ip[core]} 'clear lacp statistics'
	echo -n 'Sleeping for a second or two...'
	sleep 2
	echo 'Checking...'
	lines=$(mgmt ${mgmt_ip[core]}  'show lacp statistics interfaces | display json ' | jq '."lacp-interface-statistics-list"[0]."lacp-interface-statistics"[0]."lag-lacp-statistics"[] | .name[0].data + " lacp-rx-packets: " + ."lacp-rx-packets"[0].data' | sed 's/"//g')
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
	header 'Ping'
	remote_ping core 10.1.200.2 "core-distro linknet - distro-side"
}

v_mgmt
core_ping
lacp_core
linkp
laptop
ferdig=yup
