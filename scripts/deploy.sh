#!/bin/bash
#Build APP
sh ./build/buildOriginIssuer.sh
sh ./build/buildOriginVerifier.sh

#modify Hosts
sudo sh ./hosts/addHosts.sh

#deploy Container Docker
docker compose down
docker compose up -d #avvia i container necessari

#restore originIssuerDB
while [ "`docker inspect -f {{.State.Health.Status}} personal-identity-wallet-originIssuerDB-1`"!="healthy" ]
do
    sleep 1;
done;
sh ./db/restoreOriginIssuerDB.sh

#restore originWalletDB
while [ "`docker inspect -f {{.State.Health.Status}} personal-identity-wallet-originWalletDB-1`"!="healthy" ] 
do
    sleep 1;
done;
sh ./db/restoreOriginWalletDB.sh

