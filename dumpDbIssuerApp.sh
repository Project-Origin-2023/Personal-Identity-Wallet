#!/bin/bash

docker exec -it personal-identity-wallet-dbIssuerApp-1 pg_dumpall -c -U admin > ./issuerApp/dump_db.sql 