from django.db import models


class GNArticle(models.Model):
    title = models.CharField(max_length=100)
    message = models.CharField(max_length=500, blank=True)
    source = models.CharField(max_length=500, blank=True)
    createdAt = models.DateTimeField(auto_now_add=True)
