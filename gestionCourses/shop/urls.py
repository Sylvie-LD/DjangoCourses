from django.urls import path
from . import views
from .views import ProduitListView


app_name = 'shop'

urlpatterns = [
    # Vues API
    path('api/categories/', views.CategorieListCreate.as_view(),
         name='categorie-list-create'),
    path('api/rayons/', views.RayonListCreate.as_view(),
         name='rayon-list-create'),
    path('api/etagere/', views.EtagereListCreate.as_view(),
         name='etagere-list-create'),
    path('api/produits/', views.ProduitListCreate.as_view(),
         name='produit-list-create'),



# Autres vues
    path('', views.index, name='index'),
    path('ajouter_produit/', views.ajouter_produit,
         name='ajouter_produit'),
    path('produits/', views.ProduitListView.as_view(),
         name='produit_list'),
    ]