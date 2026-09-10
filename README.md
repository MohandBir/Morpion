# Morpion

Jeu de morpion (tic-tac-toe) codé en HTML, CSS et JavaScript, avec un code minifié, performant et maintenable.

## Structure du projet

```
app/public/
├── index.html       # Page du jeu
├── css/style.css     # Styles
└── js/script.js       # Logique du jeu
docker/
├── php/Dockerfile     # Image PHP
└── nginx/nginx.conf   # Config du serveur Nginx
docker-compose.yml
```

## Lancer le projet

Le projet est servi via Docker (Nginx + PHP).

```bash
docker compose up -d
```

Puis ouvrir [http://localhost:8080](http://localhost:8080) dans le navigateur.

## Technologies

- HTML5
- CSS3
- JavaScript
- Docker (Nginx + PHP)
