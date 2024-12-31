# agenda/models.py
from django.db import models

class Event(models.Model):
    title = models.CharField(max_length=255)
    start_date = models.DateTimeField()
    end_date = models.DateTimeField()
    all_day = models.BooleanField(default=False)  # Nouveau champ


    def __str__(self):
        return self.title

    class Meta:
        ordering = ['start_date']  # On trie dans cet ordre