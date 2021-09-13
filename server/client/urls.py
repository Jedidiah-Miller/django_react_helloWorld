from django.urls import path
from . import views


urlpatterns = [
  # basically find a way to only look at the 'yourdomain.com' part and everything else get handled by react router
  # re_path is needed for refreshing on a browser route
  # re_path requires csrf protect I guess
  path('', views.index)
  # url(r'^(?:.*)/$', TemplateView.as_view(template_name='index.html'))
]