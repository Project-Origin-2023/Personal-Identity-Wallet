#!/bin/bash

docker exec -it personal-identity-wallet-originWalletDB-1 pg_dump -U admin originwallet > ../config/db/originWalletDB/dump_db.sql
