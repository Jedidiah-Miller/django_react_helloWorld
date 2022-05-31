from rest_framework import serializers
from google_news.models import GNArticle

class GNArticleSerializer(serializers.ModelSerializer):

    class Meta:
        model = GNArticle
        fields = '__all__'