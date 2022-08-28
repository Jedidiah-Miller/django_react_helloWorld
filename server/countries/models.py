from django.db import models


class Country(models.Model):
  name = models.CharField(max_length=100)
  flag = models.CharField(max_length=100)
  createdAt = models.DateTimeField(auto_now_add=True)