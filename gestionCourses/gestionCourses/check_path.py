import sys
print(sys.path)

try:
    import gestionCourses
    print("Module 'gestionCourses' importé avec succès")
except ImportError as e:
    print("Erreur d'importation pour 'gestionCourses':", e)

try:
    import gestionCourses.magasin
    print("Module 'gestionCourses.magasin' importé avec succès")
except ImportError as e:
    print("Erreur d'importation pour 'gestionCourses.magasin':", e)
