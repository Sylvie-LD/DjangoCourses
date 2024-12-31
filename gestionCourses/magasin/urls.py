
from django.urls import path,include

from . import views
from django.contrib.auth.views import LoginView
from django.contrib.auth.views import LogoutView
app_name = 'magasin'

# Routes principales
urlpatterns_main = [
    path('test-logging/', views.test_logging_view,
         name='test_logging'),
    # Route pour tester le logging

    path('', views.index, name='index'),
    path('login/', LoginView.as_view(next_page='/magasin/'), name='login'),
    path('logout/', LogoutView.as_view(next_page='/magasin/login'), name='logout'),
    path('favoris/', views.favoris, name='favoris'),]

urlpatterns_creation= [
    path('creer_magasin/', views.creer_magasin,
     name='creer_magasin'),
    path('magasin_graphique/', views.magasin_graphique,
         name='magasin_graphique'),
]

# Routes pour la gestion des produits
urlpatterns_produits = [
    path('voir_produits_magasin',views.voir_produits_magasin,name='voir_produits_magasin'),
    path('add_produit/', views.add_produit, name ='add_produit'),
    path('modifier_produit_magasin/<int:id_produit>/', views.modifier_produit_magasin, name='modifier_produit_magasin'),
    path('supprimer_produit_magasin/<int:id_produit>/',views.supprimer_produit_magasin,name='supprimer_produit_magasin'),
]

# Routes pour la gestion des catégories
urlpatterns_categories = [
    path('voir_categorie_produits/',views.voir_categorie_produits,name='voir_categorie_produits'),
    path('ajouter_categorie_produits/', views.ajouter_categorie_produits,name='ajouter_categorie_produits'),
    path('modifier_categorie_produit_magasin/<int:id_categorie_produit>/', views.modifier_categorie_produit_magasin, name='modifier_categorie_produit_magasin'),
    path('supprimer_categorie_produit_magasin/<int:id_categorie_produit>/', views.supprimer_categorie_produit_magasin, name='supprimer_categorie_produit_magasin'),
]

# Routes pour la gestion des rayons
urlpatterns_rayons = [
    path('voir_rayons_magasin/', views.voir_rayons_magasin, name='voir_rayons_magasin'),
    path('ajouter_rayon_magasin/', views.ajouter_rayon_magasin, name='ajouter_rayon_magasin'),
    path('modifier_rayon_magasin/<int:id_rayon>/',views.modifier_rayon_magasin, name='modifier_rayon_magasin'),
    path('supprimer_rayon_magasin/<int:id_rayon>/', views.supprimer_rayon_magasin, name='supprimer_rayon_magasin'),
]

# Routes pour la gestion des étagères
urlpatterns_etageres = [
    path('voir_etageres_magasin/', views.voir_etageres_magasin, name='voir_etageres_magasin'),
    path('ajouter_etagere_magasin/', views.ajouter_etagere_magasin, name='ajouter_etagere_magasin'),
    path('modifier_etagere_magasin/<int:id_etagere>/',views.modifier_etagere_magasin, name='modifier_etagere_magasin'),
    path('supprimer_etagere_magasin/<int:id_etagere>/', views.supprimer_etagere_magasin, name='supprimer_etagere_magasin'),
]

# Routes pour la gestion des listes de courses
urlpatterns_listes_courses = [
    path('voir_liste_de_courses/', views.voir_liste_de_courses, name = 'voir_liste_de_courses'),
    path('ajouter_liste_courses/',views.ajouter_liste_courses, name='ajouter_liste_courses'),
    path('modifier/<int:id_liste_courses>/',views.modifier_liste_courses, name='modifier_liste_courses'),
    path('supprimer/<int:id_liste_courses>/', views.supprimer_liste_courses, name='supprimer_liste_courses'),
]

# Routes pour la gestion des produits de la liste de courses
urlpatterns_produits_liste_courses = [
    path('voir_produits_liste_courses/<int:id_liste_courses>/', views.voir_produits_liste_courses, name='voir_produits_liste_courses'),
    path('ajouter_produit_liste_courses/<int:id_liste_courses>/', views.ajouter_produit_liste_courses, name='ajouter_produit_liste_courses'),
    path('modifier_produit_liste_courses/<int:id_element_liste>', views.modifier_produit_liste_courses,
        name='modifier_produit_liste_courses'),
    path('supprimer_produit_liste_courses/<int:id_element_liste>/', views.supprimer_produit_liste_courses,
        name='supprimer_produit_liste_courses'),
]

urlpatterns_tests =[
    path('test/', views.test, name='test'),

    path('rayons/', views.rayons, name ='rayons'),
    path('select_rayon/', views.select_rayon,name='select_rayon'),
    path('produits_a_prendre_dans_rayon/', views.produits_a_prendre_dans_rayon, name='produits_a_prendre_dans_rayon'),
    path('voir_produits_magasin_par_rayon/',views.voir_produits_magasin_par_rayon, name='voir_produits_magasin_par_rayon'),
    path('page_choisir_rayon/', views.page_choisir_rayon, name='page_choisir_rayon'),
    path('proposition_produits/',views.proposition_produits,name='proposition_produits'),
    path('visualiser_produits_magasin/',
         views.visualiser_produits_magasin,
         name='visualiser_produits_magasin'),
]

# Combinaison des urlpatterns
urlpatterns = urlpatterns_main + urlpatterns_creation + urlpatterns_produits + urlpatterns_categories + urlpatterns_rayons + urlpatterns_etageres + urlpatterns_listes_courses + urlpatterns_produits_liste_courses + urlpatterns_tests

# URL de l'API
urlpatterns += [
    path('api/', include('magasin.api_urls')),
]
# Inclure les URL de l'API depuis api_urls.py , http://127.0.0.1:8081/magasin/api/