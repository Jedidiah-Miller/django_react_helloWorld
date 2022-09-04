from pprint import pprint
from server.settings import DB
from google.cloud.firestore import CollectionReference


class FirestoreCollectionManager:

    collection: CollectionReference

    def __init__(self, collection_name: str = 'Collection'):
        if not collection_name:
            raise Exception("NO COLLECTION NAME")
        self.collection = DB.collection(collection_name)
        print(f"INITIALIZED {self.collection.__class__}", self.collection.id)