from django.urls import path, include
from .api import CountryAPI


urlpatterns = [
  path('api/countries', CountryAPI.as_view())
]