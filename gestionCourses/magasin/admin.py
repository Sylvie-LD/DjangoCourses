from django.contrib import admin
from .models import Produit, CategorieProduit, Etagere, AssociationEtagereProduit, Rayon, AssociationRayonEtagere

@admin.register(Produit)
class ProduitAdmin(admin.ModelAdmin):
    list_display = ('nom_produits', 'categorie_produit_name', 'etagere_name', 'rayon_name')
    list_filter = ['id_categorie_produit']
    list_per_page = 5
    def nom_produits(self, obj):
        return obj.nom_produit
    nom_produits.short_description = 'pfroduissts'

    def categorie_produit_name(self, obj):
       categorie = CategorieProduit.objects.get(
                    id_categorie_produit=obj.id_categorie_produit)
       return categorie.nom_categorie_produit

    categorie_produit_name.short_description = 'Catégorie de prod'

    def etagere_name(self, obj):
        association = AssociationEtagereProduit.objects.filter(
            id_produit=obj.id_produit).first()
        if association:
            etagere = Etagere.objects.get(
                id_etagere=association.id_etagere)
            return etagere.nom_etagere
        return '-'

    etagere_name.short_description = 'Étagère'

    def rayon_name(self, obj):
        print(
            f"Produit: {obj.nom_produit}, ID Produit: {obj.id_produit}")  # Log de base

        association_etagere = AssociationEtagereProduit.objects.filter(
            id_produit=obj.id_produit).first()
        if association_etagere:
            print(
                f"Association Étagère trouvée: {association_etagere.id_etagere}")  # Log de vérification

            association_rayon = AssociationRayonEtagere.objects.filter(
                id_etagere=association_etagere.id_etagere).first()
            if association_rayon:
                print(
                    f"Association Rayon trouvée: {association_rayon.id_rayon}")  # Log de vérification

                rayon = Rayon.objects.get(
                    id_rayon=association_rayon.id_rayon)
                return rayon.nom_rayon
            else:
                print(
                    f"Aucune association Rayon trouvée pour l'étagère ID: {association_etagere.id_etagere}")
        else:
            print(
                f"Aucune association Étagère trouvée pour le produit ID: {obj.id_produit}")
        print(
            "Aucun Rayon trouvé")  # Log en cas d'absence de Rayon
        return '-'

    rayon_name.short_description = 'Rayyon'


@admin.register(CategorieProduit)
class CategorieProduitAdmin(admin.ModelAdmin):
    fields =('nom_categorie_produit',)

@admin.register(Rayon)
class EtagereAdmin(admin.ModelAdmin):
    fields =('nom_rayon',)

admin.site.register(Etagere)

