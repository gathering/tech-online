#!/bin/bash

station=$2
pw=$2
GET -C "$(cat /techopw)" "https://techo.gathering.org/api/admin/stations/?track=net&shortname=$1" | jq '.[]' > foo.json
ID=$(cat foo.json | jq .id | sed 's/"//g')
echo $ID
cat foo.json | jq ". +{credentials: \"$2\"}" | lwp-request -m PUT -C "$(cat /techopw)" "https://techo.gathering.org/api/station/${ID}"

