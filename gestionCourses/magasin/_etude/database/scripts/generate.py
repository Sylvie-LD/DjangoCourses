# --------------------------------------------------------------------------- #
#
# script python pour la génération des tables de la base de données
# et insertion des jeux de données
#
# simplifie les modifications fréquentes nécessaire lors de la phase de
# conception, permet de rejouer fréquemment une reconstruction complète
# des éléments, en mettant à jour seulement les instruction SQL qui
# ont changées.
#
# --------------------------------------------------------------------------- #
import os

if __name__ == '__main__':

    # adapter les valeurs en rapport avec la configuration de votre environnement
    # de développement
    SERVER = "127.0.0.1"
    PORT = 5432
    USER = "dev"
    PASSWORD = "dvppp"

    #SCRIPTS_DIRECTORY = "C:\\Users\\sylvie L\\PycharmProjects\\Projet_meteo_bdd\\etude\\database\\scripts\\"
    SCRIPTS_DIRECTORY = r'C:\Users\dev\PycharmProjects\DjangoCourses\gestionCourses\magasin\_etude\database\scripts\\'
    # C:\Users\dev\PycharmProjects\DjangoCourses\gestionCourses\magasin\_etude\database\scripts
    # DATABASE = "gestion_courses_db"
    # DATABASE = "django_gestion_courses_db"
    DATABASE = "djangoRestCourses_db"
    POSTGRESQL_BIN = "C:\\Program Files\\PostgreSQL\\16\\bin"

    SCRIPT_00 = "00_create_tables.sql"
    SCRIPT_01 = "01_produit_insert.sql"
    SCRIPT_02 = "02_etagere_insert.sql"
    SCRIPT_03 = "03_association_etagere_produit_insert.sql"
    #SCRIPT_04 = "04_utilisateur_insert.sql"
    SCRIPT_05 = "05_categorie_produit_insert.sql"
    SCRIPT_06 = "06_rayon_insert.sql"
    # SCRIPT_07 = "07_association_rayon_etagere_insert.sql"
    #SCRIPT_08 = "08_association_liste_produit_insert.sql"
    #SCRIPT_09 = "09_liste_courses_insert.sql"

    scripts = []
    scripts.append(SCRIPT_00) #creéation table
    scripts.append(SCRIPT_01) #produits
    scripts.append(SCRIPT_02) #étagères
    scripts.append(SCRIPT_03) #association etager_produit
   # scripts.append(SCRIPT_04)
    scripts.append(SCRIPT_05) #categorie produit
    scripts.append(SCRIPT_06) #rayon
    # scripts.append(SCRIPT_07)
    #scripts.append(SCRIPT_08)
    #scripts.append(SCRIPT_09)

    # configuration spécifique pour Windows
    os.chdir(POSTGRESQL_BIN) # on se déplace dans le répertoire des binaires de postgresql (évite de configurer une variable d'environnement sous Windows
    os.environ["PGPASSWORD"] = PASSWORD # définit le mot de passe pour la sessions en cours, car sous Windows, le mot de passe ne peut être soumis via la ligne de commande
    print("Répertoire de travail redéfinit : " + os.getcwd())

    i = 0
    for script in scripts:
        print("Exécution de : '{0}'".format(script) + " ...")

        command = "psql.exe -U {0} -h {1} -p {2} -d {3} -a -f {4} > {6}".format(USER, SERVER, PORT, DATABASE, '"' + SCRIPTS_DIRECTORY + script + '"', PASSWORD, '"' + SCRIPTS_DIRECTORY + "command_{0}.log".format(i) + '"')
        print(command)
        os.system(command)
        i = i + 1

    print("Fin des traitements.")
