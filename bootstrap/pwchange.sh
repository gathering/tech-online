#!/bin/bash

station=$2
pw="ssh to s${1}.techo.no username techo password $2"
GET -C "$(cat /techopw)" "https://techo.gathering.org/api/admin/stations/?track=net&shortname=$1" | jq '.[]' > foo.json
ID=$(cat foo.json | jq .id | sed 's/"//g')
echo $ID
cat foo.json | jq ". +{credentials: \"${pw}\"}" | lwp-request -m PUT -C "$(cat /techopw)" "https://techo.gathering.org/api/station/${ID}"

