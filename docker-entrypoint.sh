#!/usr/bin/env bash

set -e

pipenv run python manage.py migrate
pipenv run python manage.py runserver 0.0.0.0:8080