#!/bin/bash
git clone https://github.com/walt-id/waltid-idpkit.git
cd waltid-idpkit
docker build --rm -t waltid/idpkit .
cd ..
rm -r waltid-idpkit