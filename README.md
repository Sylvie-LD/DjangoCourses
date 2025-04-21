# DjangoCourses
Objectif  initial : faire les courses le plus rapidement possible quand on est dans le magasin
Fait en autodidacte
Projet en cours

## Installation
```
# Cloner le repertoire
git clone https://github.com/Sylvie-LD/djangoCourses.git

# Naviguer dans le dossier
cd gestionCourses

# Créer un environnement virtuel
python -m venv venv

# Activer l'environnement virtuel
.\venv\Scripts\activate

# Installer les dépendances
pip install -r requirements.txt

# creer un fichier .env à la racine
cp .env .env.example

# Vérifier la base de données
python manage.py makemigrations
python manage.py migrate

# lancer le serveur 
python manage.py runserver

# Accéder au site
http://127.0.0.1:8000


```