import os

from dotenv import load_dotenv

load_dotenv()

from django.core.wsgi import get_wsgi_application

from lumiere.environment import settings_module

os.environ.setdefault("DJANGO_SETTINGS_MODULE", settings_module())

application = get_wsgi_application()
