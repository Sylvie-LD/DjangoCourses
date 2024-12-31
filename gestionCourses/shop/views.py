from django.shortcuts import render

# Create your views here.
from django.shortcuts import render
from django.http import HttpResponse


def index(request):
    return render(request, 'shop/index.html')

from rest_framework import generics
from .models import Categorie, Rayon, Etagere, Produit
from .serializers import CategorieSerializer, RayonSerializer, EtagereSerializer, ProduitSerializer

class CategorieListCreate(generics.ListCreateAPIView):
    queryset = Categorie.objects.all()
    serializer_class = CategorieSerializer

class RayonListCreate(generics.ListCreateAPIView):
    queryset = Rayon.objects.all()
    serializer_class = RayonSerializer

class EtagereListCreate(generics.ListCreateAPIView):
    queryset = Etagere.objects.all()
    serializer_class = EtagereSerializer

class ProduitListCreate(generics.ListCreateAPIView):
    queryset = Produit.objects.all()
    serializer_class = ProduitSerializer

    def get_queryset(self):
        """
        Optionnel : filtre les produits en fonction du rayon spécifié dans les paramètres de requête.
        """
        queryset = Produit.objects.all()
        rayon_id = self.request.query_params.get('rayon',
                                                 None)
        if rayon_id is not None:
            queryset = queryset.filter(rayon_id=rayon_id)
        return queryset

from rest_framework import generics
from .models import Produit
from .serializers import ProduitCreateSerializer

class ProduitCreateView(generics.CreateAPIView):
    queryset = Produit.objects.all()
    serializer_class = ProduitCreateSerializer


from django.shortcuts import render, redirect
from .forms import ProduitForm


def ajouter_produit(request):
    if request.method == 'POST':
        form = ProduitForm(request.POST)
        if form.is_valid():
            produit = form.save(commit=False)
            print(f'Produit catégorie: {produit.categorie}')  # Débogage

            # Trouver l'étagère et le rayon associés à la catégorie
            etagere = produit.categorie.etagere_defaut
            if etagere:
                produit.etagere = etagere
                produit.rayon = etagere.rayon  # Assigner le rayon lié à l'étagère

            produit.save()  # Enregistre le produit dans la base de données
            return redirect('shop:produit_list')
    else:
        form = ProduitForm()

    return render(request, 'shop/ajouter_produit.html', {'form': form})

from django.shortcuts import render
from .models import Produit
from .serializers import ProduitSerializer
from rest_framework import generics
from django.views.generic import ListView


class ProduitListView(ListView):
    model = Produit
    template_name = 'shop/produit_list.html'
    context_object_name = 'produits'
