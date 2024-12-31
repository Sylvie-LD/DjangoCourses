import logging

# instance de logger
logger = logging.getLogger("gestionCourses")

from rest_framework import viewsets
from rest_framework.response import Response

from .models import AssociationEtagereProduit, AssociationRayonEtagere, CategorieProduit, Etagere, Produit, Rayon, ListeCourses, ElementListe
from .serializers import (

    EtagereSerializer,
    ProduitSerializer,
    RayonSerializer,
)
from rest_framework.pagination import PageNumberPagination

class CustomPagination(PageNumberPagination):
    page_size = 7  # Nombre d'objets par page pour http://127.0.0.1:8081/magasin/api/rayons/, si on règle à 1 on ne récupère que les infos de la page 1 soit le rayon 1 donc on règle à 7 pour le moment

    def get_paginated_response(self, data):
        return Response({
            'count': self.page.paginator.count,
            'total_pages': self.page.paginator.num_pages,
            'current_page': self.page.number,
            'next': self.get_next_link(),
            'previous': self.get_previous_link(),
            'results': data
        })

class EtagereViewSet(viewsets.ModelViewSet):
    queryset = Etagere.objects.all().order_by('id_etagere')  # Assure que les résultats sont triés
    serializer_class = EtagereSerializer

class ProduitViewSet(viewsets.ModelViewSet):
    queryset = Produit.objects.all().order_by('id_produit')  # Assure que les résultats sont triés
    serializer_class = ProduitSerializer

class RayonViewSet(viewsets.ModelViewSet):
    queryset = Rayon.objects.all().order_by('id_rayon')  # Assure que les résultats sont triés
    serializer_class = RayonSerializer


    pagination_class = CustomPagination  # Utilisation de la pagination personnalisée





