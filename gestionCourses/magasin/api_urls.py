
# api_urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .api_views import ProduitViewSet, EtagereViewSet,RayonViewSet

# Créer un routeur pour les vues API
# Gère les routes spécifiques à l'API de l'application magasin.
router = DefaultRouter()

router.register(r'rayons', RayonViewSet)
router.register(r'etageres', EtagereViewSet)
router.register(r'produits', ProduitViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
