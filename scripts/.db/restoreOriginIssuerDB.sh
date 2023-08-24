#!/bin/bash

cat ../config/db/originIssuerDB/dump_db.sql | docker exec -i personal-identity-wallet-originIssuerDB-1 psql -U admin -d originissuer