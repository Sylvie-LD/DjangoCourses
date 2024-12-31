from django.http import JsonResponse

from django.shortcuts import render,redirect

from django.http import HttpResponse
from django.template import loader
from django.contrib.auth.decorators import login_required
import logging

from django.shortcuts import render,get_object_or_404
from .forms import *

from django.shortcuts import render
from .serializers import ProduitSerializer
from .models import AssociationEtagereProduit
from rest_framework.response import Response
from rest_framework import status
from django.http import JsonResponse


# MAIN-----------------------------------------------------------------------------------------------
logger = logging.getLogger("gestionCourses")

def test_logging_view(request):  # http://127.0.0.1:8081/magasin/test-logging/
    logger.debug('Débogage depuis la vue')
    logger.info('Information depuis la vue')
    logger.warning('Avertissement depuis la vue')
    logger.error('Erreur depuis la vue')
    logger.critical('Critique depuis la vue')
    return HttpResponse('Vérification des logs')


@login_required(login_url=f'/magasin/login/?next=/previsions/login/')
def index(request):
    logger.info("entrée dans la view 'Index'")
    template = loader.get_template('magasin/index.html')
    context = {}
    liste_produits_favoris = [ 'Pain','Vin','boursin']
    request.session ['favoris'] = liste_produits_favoris

    return HttpResponse(template.render(context, request))

def favoris (request):
    liste_produits_favoris = request.session['favoris']
    context ={'favoris': liste_produits_favoris,}
    logger.warning("Accès au template 'favoris'")
    return render(request, 'magasin/favoris.html',context)

# --CREATION--------------------------------------------------------------------------------------------
def creer_magasin(request):
    context = {}
    return render (request, 'magasin/creer_magasin.html',context)

def magasin_graphique(request):
    logger.info("Traitement de la vue magasin_graphique avec les serializers.")
    return render(request, 'magasin/magasin_graphique.html')


# GESTION PRODUITS-------------------------------------------------------------------------------------------
from django.shortcuts import render
from .models import Produit
from .serializers import ProduitSerializer


def voir_produits_magasin(request):
    produits = Produit.objects.all()  # Récupération de tous les produits
    serializer = ProduitSerializer(produits,
                                   many=True)  # Sérialiser les produits

    logger.debug("Produits sérialisés : %s",
                 serializer.data)  # Ajout d'un log pour déboguer

    context = {
        'produits': serializer.data}  # Passer les données au contexte
    return render(request,
                  'magasin/voir_produits_magasin.html',
                  context)


def add_produit(request):
    save_error = False
    is_create = True

    if request.method == 'POST':
        is_create = False
        form = Produitform(request.POST)
        logger.info("Formulaire POST reçu.")

        if form.is_valid():
            logger.info("Formulaire valide.")

            nom = form.cleaned_data["nom"]
            categorie_produit = form.cleaned_data["categorie_produit"]
            etagere = form.cleaned_data["etagere"]

            try:
                id_categorie_produit = categorie_produit.id_categorie_produit
                id_etagere = etagere.id_etagere
                logger.info(
                    "Préparation de l'enregistrement du produit: Nom=%s, Catégorie=%s, Étagère=%s",
                    nom,
                    categorie_produit.nom_categorie_produit,
                    etagere.nom_etagere)
                produit = Produit(nom_produit=nom,
                    id_categorie_produit=id_categorie_produit)
                produit.save()

                # Créer une association entre le produit et l'étagère
                association = AssociationEtagereProduit(id_produit=produit.id_produit,
                    id_etagere=id_etagere)

                association.save()


                logger.info("Enregistrement du produit en base de données réussi.")

                form = Produitform()  # Réinitialisation du formulaire après enregistrement

            except :
                save_error = True
                logger.error("Erreur lors de l'enregistrement du produit", )

    else:
        logger.info("Requête GET reçue, initialisation du formulaire.")
        form = Produitform()  # Pour les requêtes GET, simplement initialiser le formulaire

    return render(request, 'magasin/add_produit.html', {
        'form': form,
        'save_error': save_error,
        'is_create': is_create,
    })

def modifier_produit_magasin(request, id_produit):
    produit = get_object_or_404(Produit, pk=id_produit)

    try:
        # Chercher l'association entre le produit et l'étagère
        association = AssociationEtagereProduit.objects.get(id_produit=produit.id_produit)
        initial_etagere = association.id_etagere
    except AssociationEtagereProduit.DoesNotExist:
        initial_etagere = None
        logger.warning(f"Aucune association trouvée pour le produit ID {produit.id_produit}.")

    if request.method == 'POST':
        form = Produitform(request.POST)

        if form.is_valid():
            nom = form.cleaned_data["nom"]
            categorie_produit = form.cleaned_data["categorie_produit"]
            etagere = form.cleaned_data["etagere"]

            produit.nom_produit = nom
            produit.id_categorie_produit = categorie_produit.id_categorie_produit
            produit.save()

            # Met à jour ou crée l'association avec l'étagère
            if association:
                association.id_etagere = etagere.id_etagere
                association.save()
                logger.info(f"Association mise à jour pour le produit ID {produit.id_produit} avec l'étagère ID {etagere.id_etagere}.")
            else:
                AssociationEtagereProduit.objects.create(
                    id_produit=produit.id_produit,
                    id_etagere=etagere.id_etagere
                )
                logger.info(f"Association créée entre le produit ID {produit.id_produit} et l'étagère ID {etagere.id_etagere}.")

            return redirect("magasin:voir_produits_magasin")
    else:
        # Pour les requêtes GET, pré-remplir le formulaire avec les données existantes
        form = Produitform(initial={
            'nom': produit.nom_produit,
            'categorie_produit': produit.id_categorie_produit,
            'etagere': initial_etagere
        })

    return render(request, "magasin/modifier_produit_magasin.html", {
        "form": form,
        "produit": produit
    })
def supprimer_produit_magasin(request,id_produit):
    produit_magasin = Produit.objects.get(pk=id_produit)
    produit_magasin.delete()
    logger.warning(
        f"le produit {produit_magasin.nom_produit} a bien été supprimé.")
    return redirect ("magasin:voir_produits_magasin")

# GESTION CATEGORIE PRODUIT--------------------------------t------------------------------------------------------

def voir_categorie_produits(request):
    categorie_produits = CategorieProduit.objects.all()
    for categorie in categorie_produits:
        print(
            f"Catégorie produit ID: {categorie.id_categorie_produit}, Nom de la catégorie: {categorie.nom_categorie_produit}")
    context = {'categorie_produits': categorie_produits}
    return render(request, 'magasin/voir_categorie_produits.html',
                  context)

def ajouter_categorie_produits(request):
    save_error = False
    is_create = True

    if request.method == 'POST':
        print("Méthode POST détectée.")
        is_create = False
        form = CategorieProduitform(request.POST)
        print(f"Données soumises : {request.POST}")

        if form.is_valid():
            print("Formulaire valide.")
            categorie_produits = form.cleaned_data["nom_categorie_produit"]
            print(
                f"Nom de la catégorie à enregistrer : {categorie_produits}")

            try:
                print("enregistrement en bdd...")
                categorie_produit = CategorieProduit() #categorie_produit représente l'objet
                categorie_produit.nom_categorie_produit = categorie_produits # valeur qu'on veut donner au champ  categ_produit correspond à categorie_produit = form.cleaned_data["nom_categorie_produit"]
                categorie_produit.save()
                print("Enregistrement en base de données réussi.")

                form = CategorieProduitform()
                print("Formulaire réinitialisé.")
            except :
                save_error = True
                print(f"Erreur lors de l'enregistrement ")

    else:
        print("Méthode GET détectée.")
        form = CategorieProduitform()  # Pour les requêtes GET, simplement initialiser le formulaire

    return render(request, 'magasin/ajouter_categorie_produits.html', {
        'form': form,
        'save_error': save_error,
        'is_create': is_create,})

def modifier_categorie_produit_magasin (request, id_categorie_produit) :
    categorie = CategorieProduit.objects.get(pk=id_categorie_produit)
    print(f"Chargement de la catégorie : ID {categorie.id_categorie_produit}, Nom {categorie.nom_categorie_produit}")

    if request.method == 'POST':
        print("Méthode POST détectée.")
        form = CategorieProduitform(request.POST)
        print(f"Formulaire soumis : {request.POST}")

        if form.is_valid():
            print("Formulaire valide.")
            categorie.nom_categorie_produit = form.cleaned_data["nom_categorie_produit"]
            categorie.save()
            print(f"Catégorie mise à jour : ID {categorie.id_categorie_produit}, Nouveau nom {categorie.nom_categorie_produit}")
            return redirect ("magasin:voir_categorie_produits")
        else:
            print("Formulaire non valide.")

    else :
        print("Méthode GET détectée.")
        form = CategorieProduitform(initial={'nom_categorie_produit': categorie.nom_categorie_produit,})
        print(f"Formulaire initialisé avec les valeurs : {form.initial}")


    return render(request, "magasin/modifier_categorie_produit_magasin.html", {"form":form, "categorie": categorie})

def supprimer_categorie_produit_magasin(request,id_categorie_produit):
    categorie_produit_magasin = CategorieProduit.objects.get(pk=id_categorie_produit)

    id_categorie = categorie_produit_magasin.id_categorie_produit
    nom_categorie = categorie_produit_magasin.nom_categorie_produit

    categorie_produit_magasin.delete()
    print(f"Catégorie produit ID: {id_categorie}, Nom de la catégorie: {nom_categorie} a été supprimée.")

    return redirect ("magasin:voir_categorie_produits")

# GESTION RAYONS -------------------------------------------------------
def voir_rayons_magasin(request):
    rayons = Rayon.objects.all()
    for rayon in rayons:
        print(
            f"rayon ID: {rayon.id_rayon}, Nom du rayon: {rayon.nom_rayon}")
    context = {'rayons': rayons}
    return render(request, 'magasin/voir_rayons_magasin.html',
                  context)

def ajouter_rayon_magasin(request):
    save_error = False
    is_create = True

    if request.method == 'POST':
        is_create = False
        form = Rayonform(request.POST)

        if form.is_valid():
            rayons = form.cleaned_data["nom_rayon"] #entre crochets nom_rayon correspond à forms.py

            try:
                print("enregistrement en bdd...")
                rayon_magasin = Rayon()
                rayon_magasin.nom_rayon = rayons # nom_rayon vient de model et rayons correspond à rayons = form.cleaned_data["rayon"]
                rayon_magasin.save()
                print("Enregistrement en base de données réussi.")

                form = Rayonform()  # Réinitialisation du formulaire après enregistrement

            except :
                save_error = True
                print(f"Erreur lors de l'enregistrement ")

    else:
        form = Rayonform()  # Pour les requêtes GET, simplement initialiser le formulaire

    return render(request, 'magasin/ajouter_rayon_magasin.html', {
        'form': form,
        'save_error': save_error,
        'is_create': is_create,   })

def modifier_rayon_magasin (request, id_rayon) :
    rayons = Rayon.objects.get(pk = id_rayon)

    if request.method == 'POST':
        form = Rayonform(request.POST)

        if form.is_valid():
            rayons.nom_rayon = form.cleaned_data[
                "nom_rayon"]
            rayons.save()
            return redirect ("magasin:voir_rayons_magasin")
    else :
        form = Rayonform(initial = {'nom_rayon': rayons.nom_rayon })

    return render(request, "magasin/modifier_rayon_magasin.html", {"form":form})

def supprimer_rayon_magasin(request,id_rayon):
    rayon_magasin = Rayon.objects.get(pk=id_rayon)
    rayon_magasin.delete()
    return redirect ("magasin:voir_rayons_magasin")

# GESTION DES ETAGERES--------------------------------------- -------------------------------------------------------
def voir_etageres_magasin(request):
    etageres = Etagere.objects.all()
    context = {'etageres': etageres}
    return render(request, 'magasin/voir_etageres_magasin.html',
                  context)

def ajouter_etagere_magasin(request):
    save_error = False
    is_create = True

    if request.method == 'POST':
        is_create = False
        form = Etagereform(request.POST)

        if form.is_valid():
            etageres = form.cleaned_data["nom_etagere"] #entre crochets nom_rayon correspond à forms.py

            try:
                print("enregistrement en bdd...")
                etagere_magasin = Rayon()
                etagere_magasin.etagere_rayon = rayons # nom_rayon vient de model et rayons correspond à rayons = form.cleaned_data["rayon"]
                etagere_magasin.save()
                print("Enregistrement en base de données réussi.")

                form = Etagereform()  # Réinitialisation du formulaire après enregistrement

            except :
                save_error = True
                print(f"Erreur lors de l'enregistrement ")

    else:
        form = Etagereform()  # Pour les requêtes GET, simplement initialiser le formulaire

    return render(request, 'magasin/ajouter_etagere_magasin.html', {
        'form': form,
        'save_error': save_error,
        'is_create': is_create,   })

def modifier_etagere_magasin (request, id_etagere) :
    etageres = Etagere.objects.get(pk = id_etagere)

    if request.method == 'POST':
        form = Etagereform(request.POST)

        if form.is_valid():
            etageres.nom_rayon = form.cleaned_data[
                "nom_etagere"]
            etageres.save()
            return redirect ("magasin:voir_etageres_magasin")
    else :
        form = Etagereform(initial = {'nom_etagere': etageres.nom_etagere })

    return render(request, "magasin/modifier_etagere_magasin.html", {"form":form})

def supprimer_etagere_magasin(request,id_etagere):
    etagere_magasin = Etagere.objects.get(pk=id_etagere)
    etagere_magasin.delete()
    return redirect ("magasin:voir_etageres_magasin")

# GESTION LISTE DE COURSES---------------------------------------------------------------------------------------------------------------

def voir_liste_de_courses(request):
    liste_courses = ListeCourses.objects.all()
    for liste in liste_courses:
        print(
            f"Liste ID: {liste.id_liste_courses}, Nom: {liste.nom_liste}")
    context = {'liste_courses': liste_courses}
    return render(request, 'magasin/voir_liste_de_courses.html',
                  context)

def ajouter_liste_courses(request):
    save_error = False
    is_create = True

    if request.method == 'POST':
        is_create = False
        form = ListeProduitform(request.POST)

        if form.is_valid():
            nom_liste = form.cleaned_data["nom_liste"]

        try:
               print("enregistrement de la liste en bdd...")
               liste = ListeCourses()
               liste.nom_liste = nom_liste
               liste.save()
               print("enregistrement ok")

               form = ListeProduitform()

        except :
            save_error = True
            print("erreur lors de l'enregistrement de la liste")

    else :
        form = ListeProduitform()

    context = {'form':form, 'save_error': save_error, 'is_create':is_create, }

    return render (request, 'magasin/ajouter_liste_courses.html', context)

def modifier_liste_courses (request, id_liste_courses) :
    liste = ListeCourses.objects.get(pk = id_liste_courses)
    print(f"Liste récupérée : ID {liste.pk}, Nom actuel {liste.nom_liste}")

    if request.method == 'POST':
        print("Méthode POST détectée.")
        form = ListeProduitform(request.POST)
        print(f"Données soumises : {request.POST}")

        if form.is_valid():
            print("Formulaire valide.")

            liste.nom_liste = form.cleaned_data[
                "nom_liste"]                    #on récupère le champs nom_liste de la bdd représentée par liste

            liste.save()
            print(f"Liste mise à jour : ID {liste.pk}, Nouveau nom {liste.nom_liste}")

            return redirect ("magasin:voir_liste_de_courses")
    else :
        print("Méthode GET détectée.")
        form = ListeProduitform(initial={'nom_liste': liste.nom_liste,})
        print(
            f"Formulaire initialisé avec les valeurs : {form.initial}")

    return render(request, "magasin/modifier_liste_courses.html", {"form":form})

def supprimer_liste_courses(request,id_liste_courses):
    liste = ListeCourses.objects.get(pk=id_liste_courses)
    liste.delete()
    return redirect ("magasin:voir_liste_de_courses")

# PRODUITS DE LA LISTE DE COURSES----------------------------------------------------------------------------------
def voir_produits_liste_courses(request, id_liste_courses):
    print(f"ID de la liste des courses demandé passé en paramètre : {id_liste_courses}")

    liste_courses = ListeCourses.objects.get(pk=id_liste_courses)
    print(
        f"Objet ListeCourses récupéré: ID {liste_courses.pk}, Nom {liste_courses.nom_liste}")

    produit_liste = ElementListe.objects.filter(liste=liste_courses) #liste clé étrangère de ElementListe est associée à liste_courses, instance/représentation de ListeCourses
    print(f"Produits associés à la liste des courses récupérés avec filter : {produit_liste}")

    context = {'produit_liste': produit_liste, 'liste_courses': liste_courses,}
    print(f"Contexte préparé pour le rendu : {context}")

    return render(request, 'magasin/voir_produits_liste_courses.html',
                  context)

def ajouter_produit_liste_courses(request, id_liste_courses):
    save_error = False
    is_create = True
    liste_courses = get_object_or_404(ListeCourses, pk=id_liste_courses)


    if request.method == 'POST':
        form = ElementListeform(request.POST)
        if form.is_valid():
            is_create = False
            produit = form.cleaned_data['produit']
            quantite = form.cleaned_data['quantite']


            try:
                print("Enregistrement du produit en base de données...")
                element_liste = ElementListe(
                    liste=liste_courses,
                    produit=produit,
                    quantite=quantite
                )
                element_liste.save()
                print("Enregistrement réussi")
            except Exception as e:
                save_error = True
                print(f"Erreur lors de l'enregistrement : {e}")

    else:
        form = ElementListeform()

    context = {
        'form': form,

        'liste_courses': liste_courses,
        'save_error': save_error,
        'is_create': is_create
    }

    return render(request, 'magasin/ajouter_produit_liste_courses.html', context)

def modifier_produit_liste_courses (request, id_element_liste) :
    produit = ElementListe.objects.get(pk = id_element_liste)
    id_liste_courses = produit.liste.id_liste_courses

    if request.method == 'POST':
        form = ElementListeform(request.POST)

        if form.is_valid():
            produit.produit = form.cleaned_data['produit']
            produit.quantite = form.cleaned_data['quantite']
            produit.save()
            return redirect ("magasin:voir_produits_liste_courses", id_liste_courses=id_liste_courses)
    else :
        form = ElementListeform(
            initial={'produit': produit.produit,
                     'quantite': produit.quantite})

    return render(request, "magasin/modifier_produit_liste_courses.html", {"form":form, "id_liste_courses":id_liste_courses})

def supprimer_produit_liste_courses(request,id_element_liste):
    produit = ElementListe.objects.get(pk=id_element_liste)
    id_liste_courses = produit.liste.id_liste_courses
    produit.delete()
    return redirect("magasin:voir_produits_liste_courses", id_liste_courses=id_liste_courses)

  # ------------------------------------------------------------------------------------------------
  # --DECOMPOSITION POUR AJOUTER PROCUIT : VOIR PRODUIT DU MAGASIN PUIS LES SELECTIONNER POUR LES AJOUTER PUIS LES SELECTIONNER EN FONCTION D'UNE LISTE






# ------------------------------------------------------

def page_accueil(request):

    template = loader.get_template('magasin/centre_page_accueil_V1.html')
    context = {}
    return HttpResponse(template.render(context, request))



# -----------------------------------------------------------



# ------------------------------------------------------


# TESTS-------------------------------------------------------------------------------------------------------
def test(request):
    rayon = Rayon.objects.get(id_rayon=1)
    nom_rayon = "rayon 1"
    context = {'rayon': rayon,
               'nom_rayon': nom_rayon}
    return render(request, 'magasin/test.html', context)
def rayons(request):
    rayon = Rayon.objects.get(id_rayon=1)

    etageres = Etagere.objects.filter(
        id_rayon=rayon.id_rayon)

    # Créer un liste pour stocker les étagères et produits rayon 1
    details_etageres = []

    # Pour chaque étagère, récupérer les produits associés
    for etagere in etageres:  # tère sur chaque etagere dans etageres.
        # Modèle représentant un produit.
        #: Modèle représentant l'association entre les étagères et les produit
        # Filtre les associations pour récupérer celles correspondant à l'étagère courante.
        # Récupère une liste d'IDs de produits associés à l'étagère courante.
        produits = Produit.objects.filter(
            id_produit__in=AssociationEtagereProduit.objects.filter(
                id_etagere=etagere.id_etagere).values_list(
                'id_produit', flat=True))
        # Ajoute l'étagère et produit
        details_etageres.append(
            {'etagere': etagere, 'produits': produits})

    context = {'rayon': rayon,
               'details_etageres': details_etageres}
    return render(request, 'magasin/rayons.html', context)


def select_rayon(request):
    liste_rayons = Rayon.objects.all()
    for rayon in liste_rayons:
        print(
            f"Rayon ID: {rayon.id_rayon}, Nom: {rayon.nom_rayon}")
    context = {'liste_rayons': liste_rayons}
    return render(request, 'magasin/select_rayon.html',
                  context)

def produits_a_prendre_dans_rayon (request):
    liste_rayons = Rayon.objects.all()
    for rayon in liste_rayons:
        print(
            f"Rayon ID: {rayon.id_rayon}, Nom: {rayon.nom_rayon}")

    rayon = None
    detail_etageres = []

    if request.method == 'POST':
        id_rayon = request.POST.get('id_rayon')
        if id_rayon:
            try:
                rayon = Rayon.objects.get(pk=id_rayon)
                etageres = Etagere.objects.filter(
                    id_rayon=rayon.id_rayon)

                for etagere in etageres:
                    produits = Produit.objects.filter(
                        id_produit__in=AssociationEtagereProduit.objects.filter(
                            id_etagere=etagere.id_etagere).values_list(
                            'id_produit', flat=True)
                    )
                    detail_etageres.append(
                        {'etagere': etagere,
                         'produits': produits})
            except Rayon.DoesNotExist:
                return HttpResponse("Rayon non trouvé",
                                    status=404)


    context = {'liste_rayons': liste_rayons,
               'rayon': rayon,
               'detail_etageres': detail_etageres
                              }
    return render(request, 'magasin/produits_a_prendre_dans_rayon.html',
                  context)
def voir_produits_magasin_par_rayon(request):
    produits_details = []

    # Collecter toutes les associations
    associations = AssociationEtagereProduit.objects.all()
    print(f"Associations: {associations}")

    # Créer des dictionnaires pour mapper les IDs aux objets correspondants
    etageres_dict = {etagere.id_etagere: etagere for etagere
                     in Etagere.objects.all()}
    rayons_dict = {rayon.id_rayon: rayon for rayon in
                   Rayon.objects.all()}
    produits_dict = {produit.id_produit: produit for produit
                     in Produit.objects.all()}
    categories_dict = {categorie.id_categorie_produit: categorie for categorie in CategorieProduit.objects.all()}

    print(f"Étagères: {etageres_dict}")
    print(f"Rayons: {rayons_dict}")
    print(f"Produits: {produits_dict}")
    print(f"Catégories: {categories_dict}")

    for association in associations:
        print(f"Traitement de l'association: {association}")

        produit = produits_dict.get(association.id_produit)
        etagere = etageres_dict.get(association.id_etagere)
        rayon = rayons_dict.get(
            etagere.id_rayon) if etagere else None
        categorie = categories_dict.get(produit.id_categorie_produit) if produit else None

        print(f"Produit: {produit}")
        print(f"Étagère: {etagere}")
        print(f"Rayon: {rayon}")
        print(f"Catégorie: {categorie}")

        if produit and etagere and rayon:
            produits_details.append({
                'produit': produit,
                'etagere': etagere,
                'rayon': rayon,
                'categorie': categorie,
            })

        else:
            print(
                f"Information manquante pour l'association: {association}")

    context = {'produits_details': produits_details}
    print(f"Contexte à rendre: {context}")

    return render(request,
                  'magasin/voir_produits_magasin_par_rayon.html',
                  context)

def page_choisir_rayon (request):
    liste_rayons = Rayon.objects.all()
    for rayon in liste_rayons:
        print(
            f"Rayon ID: {rayon.id_rayon}, Nom: {rayon.nom_rayon}")

    rayon = None
    detail_etageres = []

    if request.method == 'POST':
        id_rayon = request.POST.get('id_rayon')
        if id_rayon:
            try:
                # Récupérer le rayon sélectionné
                rayon = Rayon.objects.get(pk=id_rayon)
                # Récupérer les étagères associées à ce rayon
                etageres = Etagere.objects.filter(
                    id_rayon=rayon.id_rayon)
                # Pour chaque étagère, récupérer les produits associés
                for etagere in etageres:
                    # Étape 1 : Filtrer les associations entre l'étagère courante et les produits
                    associations = AssociationEtagereProduit.objects.filter(
                        id_etagere=etagere.id_etagere)

                    # Étape 2 : Extraire les IDs des produits associés
                    produit_ids = associations.values_list(
                        'id_produit', flat=True)

                    # Étape 3 : Filtrer les produits par ces IDs
                    produits = Produit.objects.filter(
                        id_produit__in=produit_ids)
                    # Ajouter les détails de l'étagère et ses produits à la liste
                    detail_etageres.append(
                        {'etagere': etagere,
                         'produits': produits})

            except Rayon.DoesNotExist:
                return HttpResponse("Rayon non trouvé",
                                    status=404)


    context = {'liste_rayons': liste_rayons,
               'rayon': rayon,
               'detail_etageres': detail_etageres
                              }
    return render(request, 'magasin/page_choisir_rayon.html',
                  context)

# pour voir les produits du magasin dans le rayon selectionné
def proposition_produits(request):
    id_rayon = request.POST['id_rayon']
    rayon = Rayon.objects.get(pk=id_rayon)
    etageres = Etagere.objects.filter(
        id_rayon=rayon.id_rayon)

    details_etageres = []
    for etagere in etageres:
        produits= Produit.objects.filter(id_produit__in=AssociationEtagereProduit.objects.filter(id_etagere=etagere.id_etagere).values_list('id_produit',flat=True))

        details_etageres.append(
            {'etagere': etagere, 'produits': produits})

    context = {'rayon': rayon,
               'details_etageres': details_etageres}
    return render(request,
                  'magasin/proposition_produits.html',
                  context)

# -----------------------------
from django.shortcuts import render

def visualiser_produits_magasin(request):
    # Récupérer tous les produits
    produits = Produit.objects.all()

    # Récupérer les catégories, étagères, et rayons en utilisant les identifiants depuis les produits
    ids_categorie = produits.values_list(
        'id_categorie_produit', flat=True).distinct()
    categories = CategorieProduit.objects.filter(
        id_categorie_produit__in=ids_categorie)
    categories_dict = {
        cat.id_categorie_produit: cat.nom_categorie_produit
        for cat in categories}

    etageres = Etagere.objects.all()
    etageres_dict = {etg.id_etagere: etg for etg in
                     etageres}

    rayons = Rayon.objects.all()
    rayons_dict = {r.id_rayon: r for r in rayons}

    # Récupérer toutes les associations produit/étagère
    associations = AssociationEtagereProduit.objects.all()

    produits_list = []

    for produit in produits:
        etagere = None
        rayon = None

        # Trouver l'association avec l'étagère
        association = next(
            (assoc for assoc in associations if
             assoc.id_produit == produit.id_produit), None)
        if association:
            etagere = etageres_dict.get(
                association.id_etagere)
            if etagere:
                rayon = rayons_dict.get(etagere.id_rayon)

        produit_dict = {
            'id_produit': produit.id_produit,
            'nom_produit': produit.nom_produit,
            'nom_categorie': categories_dict.get(
                produit.id_categorie_produit,
                'Aucune catégorie'),
            'nom_etagere': etagere.nom_etagere if etagere else 'Aucune étagère',
            'nom_rayon': rayon.nom_rayon if rayon else 'Aucun rayon',
        }
        produits_list.append(produit_dict)

    # Passer les produits au template
    context = {'produits': produits_list}
    return render(request,
                  'magasin/visualiser_produits_magasin.html',
                  context)
