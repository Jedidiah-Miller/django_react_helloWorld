from events.models import Event
from rest_framework import viewsets, permissions
from .serializers import EventSerializer

# Event Viewset
class EventViewset(viewsets.ModelViewSet):
  # idk why there is an error with Event.objects
  # it works totally fine tho
  queryset = Event.objects.all()
  permission_classes = [
    permissions.IsAuthenticated
  ]

  serializer_class = EventSerializer

  def get_queryset(self):
    return self.request.user.events.all()

  def perform_create(self, serializer):
    serializer.save(author=self.request.user)