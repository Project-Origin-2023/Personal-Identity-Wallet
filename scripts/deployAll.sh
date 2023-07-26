#!/bin/bash
#Build APP
sh ./buildIssuerApp.sh
sh ./buildVerifierApp.sh
sh ./buildPoc_waltid_presentation.sh

#Build IDP Container Docker
if ! [ -d "waltid-idpkit" ]; then
    sh ./buildWaltIdIdpImage.sh #Creo immagine IDP image
fi

docker-compose down
docker-compose up -d #avvia i container necessari
sleep 30
sh ./restoreDbIssuerApp.sh
