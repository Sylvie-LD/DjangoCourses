
from .etagere import Etagere
from ...data.data_produit import DataProduit

class Rayon():
    def __init__(self,rayon_id):
        self._nom = ""
        self._liste_etageres = []
        self._id = rayon_id

        # initialisation des étagères
        self._init_etageres()

    @property
    def nom(self):
        return self._nom

    @nom.setter
    def nom(self, value):
        self._nom = value

    @property
    def etageres(self):
        return self._liste_etageres


        # méthodes
        # ------------------------------

     # fonction pour récupérer les étagères en fonction du rayon
    def _init_etageres(self):
        # accès à la couche data pour récupérer les noms des étagères
        data = DataProduit()
        etageres = data.lister_etagere_par_rayon(self._id)

        for e in etageres:
            etagere = Etagere(e[0])
            etagere.nom = e[1]
            # etagere.id = e[1]
            self._liste_etageres.append(etagere)


    # pour l'affichage en mode console
    # def lister_produits(self):
    #     for etagere in self._liste_etageres:
    #         print(f"produits pour l'{etagere.nom}' ")
    #         etagere.lister_produits()

