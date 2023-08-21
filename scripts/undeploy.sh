#!/bin/bash

#Kill all Node.js
killall node

#restore Hosts
sudo sh ./.hosts/restoreHosts.sh

#undeploy Container Docker
docker compose down

