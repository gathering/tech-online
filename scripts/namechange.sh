#!/bin/bash

if [ $# -ne 3 ]; then
        echo "Syntax: $0 <track> <shortname> <name>" >&2
        exit 1
fi

track=$1
station=$2
name=$3
GET -C "$(cat /techopw)" "https://techo.gathering.org/api/admin/stations/?track=${track}&shortname=${station}" | jq '.[]' > foo.json
ID=$(cat foo.json | jq .id | sed 's/"//g')
echo $ID
cat foo.json | jq ". +{name:\"${name}\"}" | lwp-request -m PUT -C "$(cat /techopw)" "https://techo.gathering.org/api/station/${ID}"
