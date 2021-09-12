from django.db import models
from django.contrib.auth.models import User


class Lead(models.Model):
  name = models.CharField(max_length=100)
  email = models.EmailField(max_length=100, unique=True)
  message = models.CharField(max_length=500, blank=True)
  author = models.ForeignKey(
    User,
    related_name="leads",
    on_delete=models.CASCADE,
    null=True
  )
  createdAt = models.DateTimeField(auto_now_add=True)