from rest_framework import serializers
from .models import Categorie, Rayon, Etagere, Produit

class CategorieSerializer(serializers.ModelSerializer):
    class Meta:
        model = Categorie
        fields = ['id', 'nom']

class RayonSerializer(serializers.ModelSerializer):
    produits = serializers.SerializerMethodField()

    class Meta:
        model = Rayon
        fields = ['id', 'nom', 'produits']

    def get_produits(self, obj):
        produits = Produit.objects.filter(rayon=obj)
        serializer = ProduitSerializer(produits, many=True)
        return serializer.data

class EtagereSerializer(serializers.ModelSerializer):
    class Meta:
        model = Etagere
        fields = ['id', 'nom', 'rayon']

class ProduitSerializer(serializers.ModelSerializer):
    categorie = CategorieSerializer()
    etagere = EtagereSerializer()
    rayon = serializers.PrimaryKeyRelatedField(queryset=Rayon.objects.all())

    class Meta:
        model = Produit
        fields = ['id', 'nom', 'categorie', 'etagere', 'rayon']

from rest_framework import serializers
from .models import Categorie, Rayon, Etagere, Produit

class ProduitCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Produit
        fields = ['nom', 'categorie', 'etagere', 'rayon']  # Champs nécessaires pour créer un produit
