#!/bin/bash

#this script doesn't work in the current build#

sleep 30
docker exec depmapper_nginx_1 sh -c "certbot renew" 
echo "certification check completed"
docker cp depmapper_nginx_1:/etc/letsencrypt/archive/gwiki.cs-aware.eu/fullchain1.pem $PWD/proxy/data/archive/gwiki.cs-aware.eu/
docker cp depmapper_nginx_1:/etc/letsencrypt/archive/gwiki.cs-aware.eu/privkey1.pem $PWD/proxy/data/archive/gwiki.cs-aware.eu/
echo "fetched new certs"
echo "shutting down to switch new certs to containers"
docker-compose -f docker-compose.yml down
echo "Restarting containers"
docker-compose -f docker-compose.yml up
