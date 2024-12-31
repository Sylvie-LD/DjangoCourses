# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey and OneToOneField has `on_delete` set to the desired behavior
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
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
