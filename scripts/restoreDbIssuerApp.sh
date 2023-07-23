#!/bin/bash

cat ../issuerApp/dump_db.sql | docker exec -i personal-identity-wallet-dbIssuerApp-1 psql -U admin -d issuerapp