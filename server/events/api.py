from rest_framework import generics
from rest_framework.response import Response
from .firestore import EventsFirestore
from pprint import pprint


# Event API
class EventAPI(generics.GenericAPIView):

    events_collection = EventsFirestore(collection_name='Events')

    def post(self, request, *args, **kwargs):

        try:
            data = request.data
            event_id = self.events_collection.create_event(data)
            # return the newly created event it
            return Response({'eventId': event_id})
        except Exception as e:
            print('____________________________________')
            print(self.__class__.__name__ + ' EXCEPTION: ')
            print(e)
            print('____________________________________')


    def get(self, request, *args, **kwargs):

        try:
            events = self.events_collection.get_all_events()
            # return all events
            return Response(events)
        except Exception as e:
            print('____________________________________')
            print(self.__class__.__name__ + ' EXCEPTION: ')
            print(e)
            print('____________________________________')


    def delete(self, request, *args, **kwargs):

        try:
            params = request.query_params
            deleted_at_timestamp = self.events_collection.delete_one(params['id'])

            return Response({deleted_at_timestamp})
        except Exception as e:
            print('____________________________________')
            print(self.__class__.__name__ + ' EXCEPTION: ')
            print(e)
            print('____________________________________')