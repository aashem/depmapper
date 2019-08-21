# depmapper

## Installation

- git clone
- cd depmapper
- docker-compose -f docker-compose.yml up
- git pull for newest 

## scripts

- docker-compose build, make new docker build after changes

### development

- npm run watch @/backend folder to run server in watch mode
- npm start @/frontend folder to run react development server

## Exit

- docker-compose -f docker-compose.yml down, shuts down containers

## REST

- All graphs are saved as JSON using Cytoscapes cy.json() method
- http://localhost:3001/api/mapping/list fetches all graphs
- http://localhost:3001/api/mapping/list/:name fetches single graph using graphs name

## NGINX

nginx implementation is for demoing
