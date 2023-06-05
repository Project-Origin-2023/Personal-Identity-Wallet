#!/bin/bash

docker-compose up -d &

./deployIssuerapp.sh &

# Avvia lo script2.sh in background
./deployVerifierapp.sh &

# Avvia lo script3.sh in background
./deployWallet.sh &