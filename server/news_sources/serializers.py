from rest_framework import serializers
from news_sources.models import GNArticle

class GNArticleSerializer(serializers.ModelSerializer):

    class Meta:
        model = GNArticle
        fields = '__all__'