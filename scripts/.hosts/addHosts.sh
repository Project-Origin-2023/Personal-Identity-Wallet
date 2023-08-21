#!/bin/bash

# save hosts dump
FILE=/etc/hostsold
if test -f "$FILE"; then
    echo "restore hosts first"
    exit 1
else
    sudo cp /etc/hosts /etc/hostsold
fi

echo "127.0.0.1 openid.verifier.origin" >> /etc/hosts
echo "127.0.0.1 openid.issuer.origin" >> /etc/hosts
echo "127.0.0.1 openid.wallet.origin" >> /etc/hosts
echo "127.0.0.1 api.issuer.origin" >> /etc/hosts
echo "127.0.0.1 api.wallet.origin" >> /etc/hosts
echo "127.0.0.1 issuer.origin" >> /etc/hosts
echo "127.0.0.1 verifier.origin" >> /etc/hosts
echo "127.0.0.1 wallet.origin" >> /etc/hosts
