from django.db import models

class Rayon(models.Model):
    nom = models.CharField(max_length=100)

    def __str__(self):
        return self.nom

    class Meta:
        db_table = 'shop_rayon'  # Nom de table personnalisé pour l'application magasin


class Etagere(models.Model):
    nom = models.CharField(max_length=100)
    rayon = models.ForeignKey(Rayon, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.nom} - {self.rayon.nom}"

    class Meta:
        db_table = 'shop_etagere'  # Nom de table personnalisé pour l'application magasin


class Categorie(models.Model):
    nom = models.CharField(max_length=100, unique=True)
    etagere_defaut = models.ForeignKey(Etagere, on_delete=models.SET_NULL, null=True, blank=True, related_name='categories')

    def __str__(self):
        return self.nom

    class Meta:
        db_table = 'shop_categorie'  # Nom de table personnalisé pour l'application magasin


class Produit(models.Model):
    nom = models.CharField(max_length=100)
    categorie = models.ForeignKey(Categorie, on_delete=models.CASCADE)
    etagere = models.ForeignKey(Etagere, on_delete=models.SET_NULL, null=True, blank=True)
    rayon = models.ForeignKey(Rayon, on_delete=models.SET_NULL, null=True, blank=True)

    def save(self, *args, **kwargs):
        if self.categorie:
            # Utiliser la relation 'etagere_defaut' pour obtenir l'étagère associée
            etagere = self.categorie.etagere_defaut
            if etagere:
                self.etagere = etagere
                self.rayon = etagere.rayon  # Assigner le rayon lié à l'étagère

        super(Produit, self).save(*args, **kwargs)

    class Meta:
        db_table = 'shop_produit'  # Nom de table personnalisé pour l'application magasin
