# Django React
## Get started
in the project directory
```
$ python3 -m venv ./venv
$ source ./venv/bin/activate
$ (venv) pip3 install -r requirements.txt
```
- check requirements.txt for any additional packages that may need to be installed

in the server/client directory
```
$ (venv)  npm install --save
$ (venv)  npm run build
```

back in the server directory
```
$ (venv)  pwd
your_project/server
$ (venv)  python3 manage.py makemigrations
$ (venv)  python3 manage.py migrate
$ (venv)  python manage.py runserver
```