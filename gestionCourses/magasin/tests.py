# gestionCourses/magasin/tests.py



from django.test import TestCase
from gestionCourses.magasin.models import Produit  # Import relatif, devrait fonctionner
# from .models import Produit

class ProduitTestCase(TestCase):
    def setUp(self):
        # Configuration des donn�es pour les tests
        self.produit = Produit.objects.create(name="Test Produit")

    def test_produit_creation(self):
        # Test de la cr�ation d'un produit
        self.assertEqual(self.produit.name, "Test Produit")
