import sys
import os

print("PYTHONPATH:", sys.path)
sys.path.append(os.path.abspath('gestionCourses'))
from gestionCourses.magasin.models import Produit
