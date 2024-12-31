
from ...data.data_produit import DataProduit
from .produit import Produit
class Etagere ():

    # ------------------------------
    # constructeur
    # ------------------------------
    def __init__(self, etagere_id):
        self._nom = ""
        self._liste_produits = []
        self._id = etagere_id
        self._init_produits()

    # ------------------------------
    # propriétés
    # ------------------------------
    @property
    def nom(self):
        return self._nom

    @nom.setter
    def nom(self, value):
        self._nom = value


# Propriété nouvelle pour obtenir la vue en page web
    @property
    def produits(self):
        return self._liste_produits

    # méthodes
    def _init_produits(self):
        # accès aux données brutes des produits via couche data

        data = DataProduit()
        result = data.lister_produit_par_etagere(self._id)

        for row in result:
            produit = Produit()
            produit.nom = row[0]
            produit.categorie.nom = row[1]
            self._liste_produits.append(produit)

    # def lister_produits(self):
    #     for produit in self._liste_produits:
    #         print(f'nom du produit : {produit.nom}, categorie de produits : {produit.categorie.nom}')



