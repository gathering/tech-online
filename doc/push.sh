#!/bin/bash

set -x
set -e
mkdir -p build
jq --rawfile foo TechOnline.md '. +{content:$foo}' < net-ref.json > build/net-ref.json.out
lwp-request -m PUT -C "$(cat ~/techopw)"  https://techo.gathering.org/api/document/ref-net/ref < build/net-ref.json.out

