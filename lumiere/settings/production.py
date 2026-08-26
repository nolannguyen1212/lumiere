import os

from .base import *  # noqa: F403

DEBUG = False

ALLOWED_HOSTS = env_list("ALLOWED_HOSTS")  # noqa: F405

DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.sqlite3",
        "NAME": os.getenv("DATABASE_NAME") or BASE_DIR / "db.sqlite3",  # noqa: F405
    }
}
