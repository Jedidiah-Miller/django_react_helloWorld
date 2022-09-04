from server.firebase.collection import FirestoreCollectionManager
from google.cloud.firestore import Query
from datetime import datetime
from pprint import pprint



class EventsFirestore(FirestoreCollectionManager):

    subcollection = '_SUBCOLLECTION'

    def __init__(self, collection_name: str = 'Events'):
        super().__init__(collection_name=collection_name)


    def create_event(self, data):
        
        event = data
        event['createdAt'] = datetime.now()
        doc_ref = self.collection.add(document_data=event)[1]
        return doc_ref.id


    def get_all_events(self, order_by=Query.DESCENDING):
        docs = self.collection.order_by(u'createdAt', direction=order_by).get()
        results = []

        for doc in docs:
            event = doc.to_dict()
            event['id'] = doc.id
            results.append(event)

        return results

    
    def delete_one(self, event_id):
        return self.collection.document(event_id).delete()