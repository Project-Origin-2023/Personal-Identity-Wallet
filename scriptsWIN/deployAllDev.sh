#!/bin/bash
./buildWaltIdIdpImage.sh #Creo immagine IDP image
docker-compose up -d & #avvia i container necessari
killall node #spegne i nodi ancora avviati
./deployIssuerApp.sh & #avvia issuerApp
./deployIssuerApi.sh & #avvia issuerApi

./deployVerifierApp.sh & #avvia verifierApp

./deployWalletApp.sh & #avviawalletapp