from .categorie_produit import Categorie
class Produit ():
    # ------------------------------
    # constructeur
    # ------------------------------
    def __init__(self):
        self._nom = ""
        self._categorie_produit = Categorie()

    # ------------------------------
    # propriétés
    # ------------------------------
    @property #getter permet d'afficher le nom
    def nom(self):
        return self._nom

    @nom.setter #permet de définir la valeur
    def nom(self, value):
        self._nom = value

    @property #getter permet d'afficher la categorie
    def categorie(self):
        return self._categorie_produit

    @categorie.setter
    def categorie(self, value):
        self._categorie_produit = value

        # méthodes
        # ------------------------------







