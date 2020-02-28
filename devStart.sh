#!/bin/bash

echo "Starting nodemon + react dev server"
cd frontend
npm run start &
cd -
cd backend
npm run watch &&
fg