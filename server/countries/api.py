from rest_framework import generics
from rest_framework.response import Response

# TEMP
from .py_json import get_all_countries


# Country Viewset
class CountryAPI(generics.GenericAPIView):


  def post(self, request, *args, **kwargs):

    print('got here!')
    try:
      print('try')

    except Exception as e:
      print('____________________________________')
      print(self.__class__.__name__ + ' EXCEPTION: ')
      print(e)


  def get(self, request, *args, **kwargs):
    # get all
    try:
      country_data = get_all_countries()['list']
      return Response(country_data)

    except Exception as e:
      print('____________________________________')
      print(self.__class__.__name__ + ' EXCEPTION: ')
      print(e)