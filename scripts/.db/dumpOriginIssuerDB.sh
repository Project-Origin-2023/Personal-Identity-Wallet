#!/bin/bash

docker exec -it personal-identity-wallet-originIssuerDB-1 pg_dump -U admin originissuer > ../config/db/originIssuerDB/dump_db.sql
