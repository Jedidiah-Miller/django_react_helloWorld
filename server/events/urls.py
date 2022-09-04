from django.urls import path, include
from .api import EventAPI


urlpatterns = [
  path('api/events', EventAPI.as_view())
]