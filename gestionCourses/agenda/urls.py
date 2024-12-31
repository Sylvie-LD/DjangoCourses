from django.urls import path
from . import views

app_name = 'agenda'  # Assurez-vous que ceci est défini

urlpatterns = [
    path('', views.index, name='agenda_index'),

    path('agenda/', views.agenda, name='agenda'),

]
