import os

from dotenv import load_dotenv

load_dotenv()

from django.core.asgi import get_asgi_application

from lumiere.environment import settings_module

os.environ.setdefault("DJANGO_SETTINGS_MODULE", settings_module())

django_asgi_app = get_asgi_application()

from channels.routing import ProtocolTypeRouter, URLRouter

from notifications.middleware import JWTAuthMiddleware
from notifications.routing import websocket_urlpatterns

application = ProtocolTypeRouter(
    {
        "http": django_asgi_app,
        "websocket": JWTAuthMiddleware(URLRouter(websocket_urlpatterns)),
    }
)
