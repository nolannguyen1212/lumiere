#!/usr/bin/env bash

set -e

python manage.py makemigrations
python manage.py migrate
gunicorn lumiere.wsgi:application -b 0.0.0.0:8080 -w 3 -k gevent --name lumiere --timeout 200 --keep-alive 30