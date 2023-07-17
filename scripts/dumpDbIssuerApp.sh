#!/bin/bash

docker exec -it personal-identity-wallet-dbIssuerApp-1 pg_dump -U admin issuerapp > ./issuerApp/dump_db.sql
