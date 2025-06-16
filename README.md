# Kasa - Application Web de Location Immobilière avec React

## Description du Projet

Ce projet consiste en la réalisation du front-end d'une application web de location immobilière, Kasa. L'application permet de consulter une liste de logements, d'afficher les détails de chaque logement, et de naviguer entre différentes pages (Accueil, À Propos, Page 404).

Le front-end est développé en utilisant la bibliothèque JavaScript **React** et gère la navigation avec **React Router**. Les données des logements sont récupérées depuis une API backend fournie, lancée via **Docker**.

Ce projet a été réalisé dans le cadre de la formation [Nom de ta formation, ex: Testeur Logiciel] chez OpenClassrooms.

## Fonctionnalités

*   Affichage d'une liste de logements sur la page d'accueil.
*   Page de détail pour chaque logement, affichant les photos (slideshow), le titre, la localisation, les tags, les informations sur l'hôte, la note, la description et les équipements.
*   Page "À Propos" présentant des informations sur Kasa via des sections dépliables (Collapse).
*   Page d'erreur 404 pour les routes ou identifiants de logement invalides.
*   Navigation entre les pages via React Router.
*   Design responsive adapté aux différentes tailles d'écran (Desktop, Tablette, Mobile) basé sur les maquettes Figma.
*   Tests unitaires pour certains composants clés (Tag, Collapse, Slideshow, Banner) avec une couverture minimale de 80% pour les composants testés.

## Technologies Utilisées

*   **Front-end :**
    *   React (avec Create React App)
    *   React Router DOM
    *   Font Awesome (pour les icônes)
    *   CSS (ou SASS si tu l'as utilisé)
*   **Backend :**
    *   API fournie (Node.js)
    *   Docker (pour lancer l'API)
*   **Tests :**
    *   Jest
    *   React Testing Library

## Prérequis

Avant de commencer, assurez-vous d'avoir installé :

*   [Node.js](https://nodejs.org/) (version LTS recommandée)
*   [npm](https://www.npmjs.com/) (installé avec Node.js)
*   [Git](https://git-scm.com/)
*   [Docker Desktop](https://www.docker.com/products/docker-desktop/) (qui inclut Docker Compose)

## Installation et Lancement

Suivez ces étapes pour installer et lancer le projet localement :

1.  **Clonez le dépôt du front-end :**
    ```bash
    git clone https://github.com/DR155/Kasa-app.git
    cd Kasa-app
    ```

2.  **Installez les dépendances du front-end :**
    ```bash
    npm install
    ```

3.  **Clonez le dépôt du backend (dans un dossier séparé, pas à l'intérieur du front-end) :**
    ```bash
    git clone https://github.com/OpenClassrooms-Student-Center/TesteurLogiciel_appli_location_immobiliere_React.git Kasa-Backend
    cd Kasa-Backend
    ```

4.  **Lancez le backend avec Docker :**
    Assurez-vous que Docker Desktop est en cours d'exécution.
    ```bash
    docker compose up -d
    ```
    Le backend devrait maintenant être accessible à l'adresse `http://localhost:8080`.

5.  **Lancez l'application front-end :**
    Retournez dans le dossier du front-end (`cd ../Kasa-app`) et exécutez :
    ```bash
    npm start
    ```
    L'application devrait s'ouvrir automatiquement dans votre navigateur à l'adresse `http://localhost:3000`.

## Lancer les Tests Unitaires

Pour exécuter les tests unitaires :


```bash
npm test

*Pour générer un rapport de couverture de test :
npm test -- --coverage --watchAll=false

*##* Structure du Projet

kasa-app/
├── public/             # Fichiers statiques (index.html, assets, etc.)
├── src/
│   ├── assets/         # Images, styles globaux, etc.
│   │   ├── images/
│   │   └── styles/
│   ├── components/     # Composants React réutilisables (Card, Collapse, Slideshow, etc.)
│   │   ├── ComponentName/
│   │   │   ├── ComponentName.jsx
│   │   │   ├── ComponentName.css
│   │   │   └── ComponentName.test.js
│   │   └── ...
│   ├── layouts/        # Composants de mise en page (MainLayout)
│   ├── pages/          # Composants représentant les pages (Home, About, Logement, Error404)
│   │   ├── PageName/
│   │   │   ├── PageName.jsx
│   │   │   └── PageName.css
│   │   └── ...
│   ├── router/         # Configuration de React Router
│   ├── services/       # Fonctions pour interagir avec l'API
│   ├── App.js          # Composant racine
│   ├── index.js        # Point d'entrée de l'application
│   ├── App.css         # Styles globaux
│   └── index.css       # Styles globaux
├── .gitignore          # Fichiers ignorés par Git
├── package.json        # Dépendances et scripts
└── README.md           # Ce fichier