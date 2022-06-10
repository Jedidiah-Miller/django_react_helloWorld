from rest_framework import generics
from google_news.models import GNArticle
from rest_framework import viewsets, permissions
from rest_framework.response import Response
from .serializers import GNArticleSerializer
from .pygooglenews import GoogleNewsManager

# GNArticle Viewset
class GNArticleAPI(generics.GenericAPIView):


    def __init__(self):
        self.gn = GoogleNewsManager()


    def get(self, request, *args, **kwargs):

        try:
            # params = request.query_params

            # if no search query:
            date_time_range = '1d'
            text = 'taiwan'
            results  = self.gn.search_by_query(query=text, date_range=date_time_range)

            return Response(results)

        except Exception as e:
            print('WTF:', e )
            return Response({'error': f'error generating spreadsheet: {e}'}, status=400)


# # GNArticle Viewset
class GNArticleViewset(viewsets.ModelViewSet):

    gn = GoogleNewsManager()
    # queryset = GNArticle.objects.all()
    serializer_class = GNArticleSerializer


    def get_queryset(self):
        date_time_range = '1d'
        text = 'taiwan'
        query_results  = self.gn.search_by_query(query=text, date_range=date_time_range)
        return query_results

    # def perform_create(self, serializer):
    #     serializer.save(author=self.request.user)