#!/usr/bin/env bash

set -e

python manage.py makemigrations
python manage.py migrate
python manage.py seed_menu
python manage.py ensure_superuser
python manage.py collectstatic --noinput
daphne -b 0.0.0.0 -p 8080 lumiere.asgi:application
