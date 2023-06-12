#!/bin/bash

docker-compose up -d & #avvia i container necessari
killall node #spegne i nodi ancora avviati
./deployIssuer_app.sh & #avvia issuerApp

./deployVerifier_app.sh & #avvia verifierApp

./deployWallet_app.sh & #avviawalletapp