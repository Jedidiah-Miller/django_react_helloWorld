from rest_framework import routers
from django.urls import path
from .api import GNArticleAPI

# router = routers.DefaultRouter()
# router.register('api/google_news', GNArticleAPI, 'google_news')

base_url = 'api/'

urlpatterns = [
  path(base_url + 'google_news/', GNArticleAPI.as_view())
]