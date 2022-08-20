from rest_framework import routers
from .api import EventViewset

router = routers.DefaultRouter()
router.register('api/events', EventViewset, 'events')

urlpatterns = router.urls