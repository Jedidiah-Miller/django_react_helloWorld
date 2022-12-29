from rest_framework import routers
from django.urls import path
from .api import GNArticleAPI

# router = routers.DefaultRouter()
# router.register('api/google_news', GNArticleAPI, 'google_news')

base_url = 'api/'

urlpatterns = [
  path(base_url + 'news_sources/', GNArticleAPI.as_view())
]