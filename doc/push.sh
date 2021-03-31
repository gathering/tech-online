#!/bin/bash

set -x
set -e
mkdir -p build

ID=$(GET https://techo.gathering.org/api/documents/?family=ref-net | jq .[].id | sed 's/"//g')

echo -n $ID > build/ref-net-id
jq --rawfile foo TechOnline.md --rawfile id build/ref-net-id '. +{content:$foo} +{id:$id}' < net-ref.json > build/net-ref.json.out
lwp-request -m PUT -C "$(cat ~/techopw)"  https://techo.gathering.org/api/document/${ID} < build/net-ref.json.out

