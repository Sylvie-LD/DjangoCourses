from django.contrib import admin
from .models import Categorie, Rayon, Etagere, Produit

@admin.register(Categorie)
class CategorieAdmin(admin.ModelAdmin):
    list_display = ('nom', 'etagere_defaut')

@admin.register(Rayon)
class RayonAdmin(admin.ModelAdmin):
    list_display = ('nom',)

@admin.register(Etagere)
class EtagereAdmin(admin.ModelAdmin):
    list_display = ('nom', 'rayon')

@admin.register(Produit)
class ProduitAdmin(admin.ModelAdmin):
    list_display = ('nom', 'categorie', 'etagere', 'rayon')
    readonly_fields = ('etagere', 'rayon')

    def save_model(self, request, obj, form, change):
        if obj.categorie:
            obj.etagere = obj.categorie.etagere_defaut
            obj.rayon = obj.categorie.etagere_defaut.rayon
        super().save_model(request, obj, form, change)