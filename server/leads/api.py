from leads.models import Lead
from rest_framework import viewsets, permissions
from .serializers import LeadSerializer

# Lead Viewset
class LeadViewset(viewsets.ModelViewSet):
  # idk why there is an error with Lead.objects
  # it works totally fine tho
  queryset = Lead.objects.all()
  permission_classes = [
    permissions.IsAuthenticated
  ]

  serializer_class = LeadSerializer

  def get_queryset(self):
    return self.request.user.leads.all()

  def perform_create(self, serializer):
    serializer.save(author=self.request.user)