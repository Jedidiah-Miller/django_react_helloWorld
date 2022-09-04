import os
import firebase_admin
from firebase_admin import credentials, firestore as firebase_firestore
from google.cloud.firestore import Client


class FirebaseClient:
    # Use a service account
    ABS_DIR_PATH = os.path.dirname(os.path.abspath(__file__)) + '/'
    cred_name = './firebase_credentials.json'

    def __init__(self):
        self.intialize_firebase()

    def intialize_firebase(self):
        cred = credentials.Certificate(self.ABS_DIR_PATH + self.cred_name)
        firebase_admin.initialize_app(cred)
        print('Initialized firebase app', cred.project_id)

    def firestore(self) -> Client:
        return firebase_firestore.client()