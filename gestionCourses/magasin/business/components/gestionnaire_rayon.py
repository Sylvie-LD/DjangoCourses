from ...business.entities.rayon import Rayon

class GestionnaireRayon():
    def __init__(self, id_rayon):
        self._id_rayon = id_rayon
        self._id_etagere = ""
        self._rayon = None
        self._etagere = None

    @property
    def id_rayon(self):
        return self._id_rayon

    @id_rayon.setter
    def id_rayon(self, value):
        self._id_rayon = value

    @property
    def id_etagere(self):
        return self._id_etagere

    @id_etagere.setter
    def id_etagere(self, value):
        self._id_etagere = value

    @property
    def rayon(self):
        return self._rayon

    @rayon.setter
    def rayon(self, value):
        self._rayon = value

    @property
    def etagere(self):
        return self._etagere

    @etagere.setter
    def etagere(self, value):
        self._etagere = value


    def afficher_produits_autour_utilisateur(self):
        self._rayon = Rayon(self._id_rayon)
        return self._rayon.lister_produits()



