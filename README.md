# IPSSIProjectNode

## Contexte

Ce dépôt est purement dédié à la conception d'une API pour pouvoir gérer des sondages d'étudiants sur la qualité des cours offerts par des intervenants de l'IPSSI.

## Utilisation

Des rôles utilisateurs ont été mis en place :

- admin
- étudiant
- intervenant

L'utilisateur `admin` possède tous les droits : il gère les ressources depuis un back-office dédié aux opérations CRUD.
De ce fait il a la possibilité de gérer les modules, sessions, et la création d'utilisateur, et aussi de visualiser les moyennes par modules.

Les `étudiants` auront uniquement la possibilité de répondre aux sondages leurs concernant.

Les `intervenants` auront la possibilité de consulter les moyennes de leurs modules.

## Installation

Un environnement conteneurisé Docker a été inclus pour accélérer la mise en place du projet.
Pour lancer le projet :

`docker-compose up`

Les dépendances seront automatiquement installées au lancement des conteneurs depuis docker-compose

## Technologies

- Docker
- NodeJS
- Express
- JsonWebToken
