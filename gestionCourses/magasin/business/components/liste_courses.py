

class Liste_Courses:

    # constructeur

    def __init__(self):
        self.produits = [ ]
        self.courses_data = CoursesData()

    # # ------------------------------
    # méthodes
    # ------------------------------
    def ajouter_produits (self):
        ajout_produit = True
        while ajout_produit :
            user_input = input('quel produit voulez_vous ajouter dans la liste de courses (Taper "stop" pour terminer la liste) ? ' )
            if user_input =="stop":
                ajout_produit = False
                print("Voici votre liste: ")
                for produit in self.produits:
                    print(f" -> {produit}")
            else:
                self.produits.append(user_input)

    def inserer_produit(self):
        CoursesData().nouveau_produit()
    # def supprimer_produits (self,produit):
    #     index = self.produits.index(produit)
    #     del self.produits[index]

    def contenu_liste_de_courses (self):
        print ("Voici votre liste: ")
        for produit in self.produits:
            print (f" -> {produit}")

    def selectionner_produit_liste (self,nom_produit):
        return self.courses_data.rechercher_produit(nom_produit)

