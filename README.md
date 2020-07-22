# depmapper

## Installation 

- git clone
- cd depmapper
- docker-compose -f dockerdev.yml up || docker-compose -f docker.compose.yml up for dist version
- git pull for newest version

## scripts

- docker-compose build, make new docker build after changes
- to run frontend and backend live edit mode without docker run command bash script.sh

### development

- run in terminal 'npm install' in both backend and frontend folders
- create .env file at /backend folder root and write MONGO_URI='insert your mongo database URI HERE'
- npm run watch @/backend folder to run server in watch mode
- Go to https://localhost:3001 and accept unsafe connection (Certificates are only valid for the dist version)
- npm start @/frontend folder to run react development server
- both frontend and backend have hot code reloading and changes are applied instantly. 

## Tests

- start dockerdev.yml compose file with command | docker-compose -f dockerdev.yml up
- go to /frontend and run command npm test
- if all tests pass the service should be running properly

## Exit

- docker-compose -f docker-compose.yml down, shuts down containers

## REST

[Wiki Link](https://github.com/aashem/depmapper/wiki/REST)

## NGINX

- Nginx and SSL implemented in distribution config, dev configurations are used to change and try settings.
- Nginx dist is configured for domain: gwiki.cs-aware.eu.
