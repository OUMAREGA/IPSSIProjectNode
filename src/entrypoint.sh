#!/bin/bash
cp .env.config .env
				#génération d'une chaîne alphanumérique de 80 caractères et ajout dans .env à partir d'une substitutino
sed -i "s/JWT_KEY=/JWT_KEY=$(cat /dev/urandom | tr -dc 'a-zA-Z0-9' | fold -w 80 | head -n 1)/g" .env

npm run-script build && npm install && npm start
