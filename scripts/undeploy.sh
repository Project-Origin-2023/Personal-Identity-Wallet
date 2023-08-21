#!/bin/bash

#restore Hosts
sudo sh ./.hosts/restoreHosts.sh

#undeploy Container Docker
docker compose down

