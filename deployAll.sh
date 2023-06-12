#!/bin/bash

docker-compose up -d & #avvia i container necessari
killall node #spegne i nodi ancora avviati
./deployIssuerApp.sh & #avvia issuerApp

./deployVerifierApp.sh & #avvia verifierApp

./deployWalletApp.sh & #avviawalletapp