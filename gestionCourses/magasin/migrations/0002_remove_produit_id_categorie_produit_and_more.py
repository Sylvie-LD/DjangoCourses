# Generated by Django 5.0.6 on 2024-06-23 12:36

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('magasin', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='produit',
            name='id_categorie_produit',
        ),
        migrations.AddField(
            model_name='produit',
            name='categorie_produit',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='magasin.categorieproduit'),
        ),
    ]
