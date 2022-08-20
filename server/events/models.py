from django.db import models
from django.contrib.auth.models import User


class Event(models.Model):
  title = models.CharField(max_length=100)
  description = models.EmailField(max_length=100, unique=True)
  text = models.CharField(max_length=500, blank=True)
  url = models.URLField()
  createdAt = models.DateTimeField(auto_now_add=True)