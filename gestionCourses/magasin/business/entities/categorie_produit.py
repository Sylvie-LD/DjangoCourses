class Categorie ():
    # ------------------------------
    # constructeur
    # ------------------------------
    def __init__(self):
        self.nom = ""
    # ------------------------------
    # propriétés
    # ------------------------------
    @property
    def nom(self):
        return self._nom

    @nom.setter
    def nom(self, value):
        self._nom = value

        # méthodes
        # ------------------------------

