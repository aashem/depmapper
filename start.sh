#!/bin/bash

echo "Starting Docker containers from docker-compose.yml & trying certbot"
echo "!!THIS WILL TAKE SOME TIME!!"
bash renewCert.sh &
docker-compose -f docker-compose.yml up 

