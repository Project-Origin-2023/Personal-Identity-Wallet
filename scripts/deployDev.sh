#!/bin/bash
#kill all node.js servers
killall node

#modify Hosts
sudo sh ./.hosts/addHosts.sh 

#Deploy Dev APP
sh ./.dev/deployOriginIssuer.sh &
sh ./.dev/deployOriginVerifier.sh &
sh ./.dev/deployOriginWallet.sh &

#deploy Container Docker
docker compose down
docker compose up -d #avvia i container necessari


#restore DBs
n="healthy"
#restore originIssuerDB
m=`docker inspect -f {{.State.Health.Status}} personal-identity-wallet-originIssuerDB-1`
until [ $n == $m ]
do
    m=`docker inspect -f {{.State.Health.Status}} personal-identity-wallet-originIssuerDB-1`
    sleep 1;
done;
sh ./.db/restoreOriginIssuerDB.sh

#restore originWalletDB
m=`docker inspect -f {{.State.Health.Status}} personal-identity-wallet-originWalletDB-1`
until [ $n == $m ]
do
    m=`docker inspect -f {{.State.Health.Status}} personal-identity-wallet-originWalletDB-1`
    sleep 1;
done;
sh ./.db/restoreOriginWalletDB.sh