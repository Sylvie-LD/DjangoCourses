from django import forms
from .models import *
from django.forms import ModelChoiceField

class RayonModelChoiceField(ModelChoiceField):
    def label_from_instance(self, obj):
        return obj.nom_rayon

class CategorieProduitModelChoiceField(ModelChoiceField):
    def label_from_instance(self, obj):
        return obj.nom_categorie_produit

class EtagereModelChoiceField(ModelChoiceField):
    def label_from_instance(self, obj):
        return obj.nom_etagere

class Produitform (forms.Form) :
    nom = forms.CharField(label ='Nom du produit', max_length = 40, required = True)
    categorie_produit = forms.ModelChoiceField(label='Catégorie du produit', required=True,queryset=CategorieProduit.objects.all())
    etagere = forms.ModelChoiceField(label ='Etagère', queryset=Etagere.objects.all(),empty_label="Choisir une étagère")



# Creer des catégories de produits--------------
# class CategorieProduitModelChoiceField(forms.ModelChoiceField):
#     def label_from_instance(self, obj):
#         return obj.nom_categorie_produit

class CategorieProduitform(forms.Form):
    nom_categorie_produit = forms.CharField(label ='Catégorie de produit', max_length = 40, required = True)


# Creer des rayons-------------------
class Rayonform(forms.Form):
    nom_rayon = forms.CharField(label ='Rayon', max_length = 40, required = True)

# Creer des étagères-------------------
class Etagereform(forms.Form):
    nom_etagere = forms.CharField(label ='Etagere', max_length = 40, required = True)

# Créer une liste de courses--------------------------------------------------
class ListeProduitform(forms.Form):
    nom_liste = forms.CharField(label ='Nom', max_length = 40, required = True)

class ElementListeform(forms.Form):
    produit = forms.ModelChoiceField(queryset=Produit.objects.all(), label="Produit")
    quantite = forms.DecimalField(max_digits=10, decimal_places=0, label="Quantité")


