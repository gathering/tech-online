#!/bin/bash

if [ $# -ne 3 ]; then
        echo "Syntax: $0 <track> <shortname> '<password>'" >&2
        exit 1
fi

if [ "$1" -ne "net" ]; then
        echo "Only net track supported." >&2
        exit 1
fi

#pw="ssh to s${1}.techo.no username techo password $2"
pw="**SSH host**: s${1}.techo.no\n\n**SSH username**: techo\n\n**SSH password**: $2"
GET -C "$(cat /techopw)" "https://techo.gathering.org/api/admin/stations/?track=net&shortname=$1" | jq '.[]' > foo.json
ID=$(cat foo.json | jq .id | sed 's/"//g')
echo $ID
cat foo.json | jq ". +{credentials: \"${pw}\"}" | lwp-request -m PUT -C "$(cat /techopw)" "https://techo.gathering.org/api/station/${ID}"
