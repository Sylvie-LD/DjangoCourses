
from django.db import models


class AssociationEtagereProduit(models.Model):
    id_association_etagere_produit = models.SmallAutoField(primary_key=True)
    id_etagere = models.SmallIntegerField(blank=True, null=True)
    id_produit = models.SmallIntegerField(blank=True, null=True)

    class Meta:
        managed = True
        db_table = 'association_etagere_produit'


class AssociationRayonEtagere(models.Model):
    id_association_rayon_etagere = models.SmallAutoField(primary_key=True)
    id_rayon = models.SmallIntegerField(blank=True, null=True)
    id_etagere = models.SmallIntegerField(blank=True, null=True)

    class Meta:
        managed = True
        db_table = 'association_rayon_etagere'


class CategorieProduit(models.Model):
    id_categorie_produit = models.SmallAutoField(primary_key=True)
    nom_categorie_produit = models.CharField(max_length=50, blank=True, null=True)

    def __str__(self):
        return self.nom_categorie_produit

    class Meta:
        managed = True
        db_table = 'categorie_produit'


class Etagere(models.Model):
    id_etagere = models.SmallAutoField(primary_key=True)
    nom_etagere = models.CharField(max_length=10, blank=True, null=True)
    id_rayon = models.SmallIntegerField(blank=True, null=True)

    def __str__(self):
        return self.nom_etagere
    class Meta:
        managed = True
        db_table = 'etagere'


class Produit(models.Model):
    id_produit = models.SmallAutoField(primary_key=True)
    nom_produit = models.CharField(max_length=30, blank=True, null=True)
    id_categorie_produit = models.SmallIntegerField(blank=True, null=True)

    def __str__(self):
        return self.nom_produit

    class Meta:
        managed = True
        db_table = 'produit'


class Rayon(models.Model):
    id_rayon = models.SmallAutoField(primary_key=True)
    nom_rayon = models.CharField(max_length=10)

    def __str__(self):
        return self.nom_rayon
    class Meta:
        managed = True
        db_table = 'rayon'

class ListeCourses(models.Model):
    id_liste_courses = models.AutoField(primary_key=True)
    nom_liste = models.CharField(max_length=100)
    date_creation = models.DateField(auto_now_add=True)

    def __str__(self):
        return self.nom_liste

    class Meta:
        managed = True
        db_table = 'liste_courses'

class ElementListe(models.Model):
    id_element_liste = models.AutoField(primary_key=True)
    liste = models.ForeignKey(ListeCourses, on_delete=models.CASCADE, related_name='elements')
    produit = models.ForeignKey('Produit', on_delete=models.CASCADE)
    quantite = models.IntegerField(default=1)

    def __str__(self):
        return f"{self.quantite} {self.produit.nom_produit}"

    class Meta:
        managed = True
        db_table = 'element_liste'
