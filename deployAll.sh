#!/bin/bash

docker-compose up -d & #avvia i container necessari
killall node #spegne i nodi ancora avviati
./deployIssuerapp.sh & #avvia issuerapp

./deployVerifierapp.sh & #avvia verifierapp

./deployWallet.sh & #avviawalletapp