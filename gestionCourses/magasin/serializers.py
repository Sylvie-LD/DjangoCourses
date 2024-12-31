import logging

# instance de logger
logger = logging.getLogger("gestionCourses")

# magasin/serializers.py, permet d'afficher magasin graphique et /magasin/api/rayons
from rest_framework import serializers
from .models import Rayon, Etagere, Produit, AssociationEtagereProduit, CategorieProduit

class CategorieProduitSerializer(serializers.ModelSerializer):
    class Meta:
        model = CategorieProduit
        fields = [ 'nom_categorie_produit']
        # fields = ['id_categorie_produit', 'nom_categorie_produit']

class ProduitSerializer(serializers.ModelSerializer):
    categorie = serializers.SerializerMethodField()
    etagere = serializers.SerializerMethodField()
    rayon = serializers.SerializerMethodField()
    class Meta:
        model = Produit
        # fields = ['nom_produit', 'categorie']
        fields = ['id_produit', 'nom_produit', 'categorie', 'etagere', 'rayon']

    def get_categorie(self, obj):
        try:
            # On suppose que l'id_categorie_produit correspond au produit actuel
            categorie = CategorieProduit.objects.get(
                id_categorie_produit=obj.id_categorie_produit)
            logger.debug("Catégorie: %s pour le produit %s (ID: %s).",categorie.nom_categorie_produit,
                obj.nom_produit, obj.id_produit)
            return categorie.nom_categorie_produit
        except CategorieProduit.DoesNotExist:
            logger.warning(
                "Aucune catégorie trouvée pour le produit %s (ID: %s).",
                obj.nom_produit, obj.id_produit)
            return "Aucune catégorie"

    def get_etagere(self, obj):
        try:
            # On récupère l'association de produit avec l'étagère
            association = AssociationEtagereProduit.objects.get(
                id_produit=obj.id_produit)
            etagere = Etagere.objects.get(
                id_etagere=association.id_etagere)
            return etagere.nom_etagere
        except (AssociationEtagereProduit.DoesNotExist,
                Etagere.DoesNotExist):
            logger.warning(
                "Aucune étagère trouvée pour le produit %s (ID: %s).",
                obj.nom_produit, obj.id_produit)
            return "Aucune étagère"

    def get_rayon(self, obj):
        try:
            # On récupère l'association du produit avec l'étagère
            association = AssociationEtagereProduit.objects.get(
                id_produit=obj.id_produit)
            etagere = Etagere.objects.get(
                id_etagere=association.id_etagere)
            rayon = Rayon.objects.get(
                id_rayon=etagere.id_rayon)
            return rayon.nom_rayon
        except (AssociationEtagereProduit.DoesNotExist,
                Etagere.DoesNotExist, Rayon.DoesNotExist):
            logger.warning(
                "Aucun rayon trouvé pour le produit %s (ID: %s).",
                obj.nom_produit, obj.id_produit)
            return "Aucun rayon"


class EtagereSerializer(serializers.ModelSerializer):
    produits = serializers.SerializerMethodField()

    class Meta:
        model = Etagere
        fields = [ 'nom_etagere', 'produits']
        # fields = ['id_etagere', 'nom_etagere', 'produits']

    def get_produits(self, obj):
        # Trouver les produits associés à cette étagère via le modèle AssociationEtagereProduit
        associations = AssociationEtagereProduit.objects.filter(id_etagere=obj.id_etagere)
        if associations.exists():
            logger.debug("Associations trouvées pour l'étagère %s : %s",obj.nom_etagere, list(associations))
        else:
            logger.warning("Aucune association trouvée pour l'étagère %s (ID: %s).",obj.nom_etagere, obj.id_etagere)
        produit_ids = associations.values_list('id_produit', flat=True)
        logger.debug("IDs des produits associés pour l'étagère %s : %s", obj.nom_etagere, list(produit_ids))

        produits = Produit.objects.filter(id_produit__in=produit_ids)

        if produits.exists():
            logger.info("Produits trouvés pour l' %s : %s (ID: %s)",obj.nom_etagere, list(produits), obj.id_etagere)
        else:
            logger.warning("Aucun produit trouvé pour l'étagère %s (ID: %s).",obj.nom_etagere, obj.id_etagere)
        return ProduitSerializer(produits, many=True).data

class RayonSerializer(serializers.ModelSerializer):
    etageres = serializers.SerializerMethodField()

    class Meta:
        model = Rayon
        # fields = ['nom_rayon', 'etageres']
        fields = ['id_rayon', 'nom_rayon', 'etageres'] #id_rayon indispensable à l'affichage
    def get_etageres(self, obj):
        logger.info("Obtention des étagères pour le %s (ID: %s).", obj.nom_rayon, obj.id_rayon)
        # Filtrer les étagères associées au rayon
        etageres = Etagere.objects.filter(
            id_rayon=obj.id_rayon)
        if etageres.exists():
            logger.debug("Étagères trouvées pour le rayon %s : %s",obj.nom_rayon, list(etageres))
        else:
            logger.warning(
                "Aucune étagère trouvée pour le rayon %s (ID: %s).",
                obj.nom_rayon, obj.id_rayon)

        return EtagereSerializer(etageres, many=True).data
