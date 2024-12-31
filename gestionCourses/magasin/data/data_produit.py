import psycopg2


# ici on est dans la couche d’accès aux données, donc la plus basse, on n’a pas accès aux entités métier, on renvoie des valeurs qui sont de type #primitif (liste, dictionnaire) python car on ne peut pas intégrer, pas le droit de prendre des éléments dans classe supérieure

class DataProduit:

    # ------------------------------
    # constructeur
    # ------------------------------
    def __init__(self):

        # constantes pour les connexions à la base de données
        self._host = "localhost"
        self._database = "gestion_courses_db"
        self._user = "dev"
        self._password = "dvppp"

        self._port = 5432
    def lister_produit_par_etagere(self, id_etagere):
        # sql = """ SELECT produit.nom_produit, produit.id_produit, etagere.nom_etagere, etagere.id_etagere FROM produit INNER JOIN association_etagere_produit ON produit.id_produit = association_etagere_produit.id_produit INNER JOIN etagere ON association_etagere_produit.id_etagere = etagere.id_etagere WHERE etagere.id_etagere = %s"""
        sql = """SELECT produit.nom_produit,categorie_produit.nom_categorie_produit FROM association_etagere_produit 
        JOIN produit ON association_etagere_produit.id_produit = produit.id_produit JOIN categorie_produit ON 
        produit.id_categorie_produit = categorie_produit.id_categorie_produit WHERE 
        association_etagere_produit.id_etagere = %s"""

        connection = None
        try:
            # obtention de la connexion à la base de données
            connection = psycopg2.connect(host=self._host, database=self._database, user=self._user,
                                          password=self._password, port=self._port)
            # create a new cursor
            cursor = connection.cursor()
            record_to_insert = (id_etagere,)
            cursor.execute(sql, record_to_insert)
            rows = cursor.fetchall()
            # commit the changes to the database
            connection.commit()
            # close communication with the database
            cursor.close()
            return rows

        except (Exception, psycopg2.DatabaseError) as error:
            print("Erreur produit:")
            print(sql)
            print(record_to_insert)
        finally:
            if connection is not None:
                connection.close()

    def lister_etagere_par_rayon(self, id_rayon):
        #sql = """ SELECT etagere.nom_etagere, etagere.id_etagere FROM etagere JOIN association_rayon_etagere ON etagere.id_etagere = association_rayon_etagere.id_etagere WHERE association_rayon_etagere.id_rayon =  %s"""
        sql ="""SELECT id_etagere, nom_etagere FROM etagere WHERE id_rayon = %s"""
        connection = None
        try:
            # obtention de la connexion à la base de données
            connection = psycopg2.connect(host=self._host, database=self._database, user=self._user,
                                          password=self._password, port=self._port)
            # create a new cursor
            cursor = connection.cursor()
            record_to_insert = (id_rayon,)
            cursor.execute(sql, record_to_insert)
            rows = cursor.fetchall()
            # commit the changes to the database
            connection.commit()
            # close communication with the database
            cursor.close()
            return rows

        except (Exception, psycopg2.DatabaseError) as error:
            print(error)
            print(sql)
            print(record_to_insert)
        finally:
            if connection is not None:
                connection.close()

    def connect(self):
        """
        Fonction qui permet de valider la connexion à la base de données
        """
        try:
            # obtention de la connexion à la base de données
            connection = psycopg2.connect(host=self._host, database=self._database, user=self._user, password=self._password, port=self._port)

            cursor = connection.cursor()
            print('Version du serveur PostgreSQL:')
            cursor.execute('SELECT version()')

            db_version = cursor.fetchone()
            print(db_version)

        except (Exception, psycopg2.DatabaseError) as error:
            print(error)
        finally:
            if connection is not None:
                connection.close()
                print('Connection à la base de données fermée.')




