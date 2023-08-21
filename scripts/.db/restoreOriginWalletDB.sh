#!/bin/bash

cat ../config/db/originWalletDB/dump_db.sql | docker exec -i personal-identity-wallet-originWalletDB-1 psql -U admin -d originWallet