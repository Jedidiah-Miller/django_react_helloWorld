from server.firebase.collection import FirestoreCollectionManager
from google.cloud.firestore import Query
from datetime import datetime
from pprint import pprint



class NewsSourceFirestore(FirestoreCollectionManager):

    subcollection = '_SUBCOLLECTION'

    def __init__(self, collection_name: str = 'NewsSource'):
        super().__init__(collection_name=collection_name)


    def object_to_dict(self, data: object) -> dict:

        data = data.__dict__

        for k in data.keys():
            if data[k] is None:
                continue

            t = type(data[k])
            if t not in [None, bool, int, str, list, dict]:
                data[k] = self.object_to_dict(data[k])

        return data


    def create_news_source(self, data):

        # # TODO make sure there is no dulicate urls - or sources sharing the same url

        sub_collections = {
            'list_item_elements': None,
        }

        for k in sub_collections.keys():
            sub_collections[k] = data.pop(k, None)

        news_source = data
        news_source['createdAt'] = datetime.now()
        doc_ref = self.collection.add(document_data=news_source)[1]

        for k in sub_collections.keys():
            if sub_collections[k]:
                self.collection.document(document_id=doc_ref.id) \
                    .collection(k) \
                    .add(document_data=sub_collections[k])

        return doc_ref.id


    def get_all_news_sources(self, order_by=Query.DESCENDING):
        '''
        get all news sources and their html elements
        '''
        docs = self.collection.order_by(u'createdAt', direction=order_by).get()
        results = []

        for doc in docs:
            news_source = doc.to_dict()
            news_source['id'] = doc.id

            news_source['list_item_elements'] = self.get_list_item_elements(doc.id)

            results.append(news_source)

        return results


    def get_one_news_source(self, doc_id: str):
        doc = self.collection.document(id=doc_id)
        return doc.to_dict()


    def get_list_item_elements(self, doc_id):
        l = 'list_item_elements'
        doc = self.collection.document(document_id=doc_id) \
            .collection(l) \
            .get()[0]
        return doc.to_dict()




