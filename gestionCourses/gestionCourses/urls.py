"""
URL configuration for gestionCourses project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import include, path
from django.views.generic import RedirectView


urlpatterns = [
    path('magasin/', include('magasin.urls')),
    path('admin/', admin.site.urls),
    path('agenda/', include('agenda.urls')),
    path('shop/', include('shop.urls')),

    path('api/agenda/', include('agenda.api_urls')),
    path('api/magasin/', include('magasin.api_urls')),

    # Cela permet de rediriger automatiquement les utilisateurs vers la section principale du site (/catalog/ dans ce cas) lorsqu'ils visitent la racine du site. Penser à vider le cache si on la supprime
    path('', RedirectView.as_view(url='/magasin/',
                                  permanent=True)),
]
