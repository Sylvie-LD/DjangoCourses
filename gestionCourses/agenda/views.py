# agenda/views.py
from django.shortcuts import render


def index(request):
    # Vous devez définir ce que cette vue doit faire
    # Par exemple, rendre un template simple
    return render(request, 'agenda/index.html')


def agenda(request):
    return render(request, 'agenda/agenda.html')



# ----------------------------API
# agenda/views.py
from rest_framework import viewsets
from .models import Event
from .serializers import EventSerializer


# ModelViewSet (comme vous l'avez fait) pour les opérations de base : création, lecture, mise à jour et suppression des événements.
class EventViewSet(viewsets.ModelViewSet):
    queryset = Event.objects.all().order_by('start_date')  # Ou un autre champ
    serializer_class = EventSerializer
