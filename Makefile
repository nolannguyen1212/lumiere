.PHONY: install migrate seed superuser api web dev test lint build

install:
	uv sync
	cd client && npm install

migrate:
	uv run python manage.py migrate

seed:
	uv run python manage.py seed_menu

superuser:
	uv run python manage.py createsuperuser

api:
	uv run python manage.py runserver 8000

web:
	cd client && npm run dev

dev:
	$(MAKE) -j2 api web

test:
	uv run python manage.py test tests

lint:
	cd client && npm run lint

build:
	cd client && npm run build
