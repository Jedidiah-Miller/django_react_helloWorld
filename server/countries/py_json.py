import json
import os
from pprint import pprint


default_file_path = 'country_data.json'


def get_file_path(file_path: str) -> str:
  dirname = os.path.dirname(__file__)
  return os.path.join(dirname, file_path)


def load_json(file_path: str):
  with open(file_path) as f:
    data = json.load(f)
    return data


def create_json_file(file_path: str, data: dict):
  with open(file_path, 'w') as outfile:
    jstr = json.dumps(data, indent=4)
    json.dump(jstr, outfile)


def temp_update_data(data):

  for i, c in enumerate(data.get('list')):
    updated_data = {
      'id': int(c['id']),
      'name': c['name']
    }

    data['list'][i] = updated_data

  return data




def get_all_countries():
  country_file_path = get_file_path(default_file_path)
  return load_json(country_file_path)
