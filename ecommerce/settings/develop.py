from .base import *

# Security
ALLOWED_HOSTS = ["*"]
CORS_ALLOW_ALL_ORIGINS = True
CORS_ALLOW_CREDENTIALS = True
CSRF_TRUSTED_ORIGINS = ["http://localhost:8000", "https://127.0.0.1:8000"]

# Database
DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.mysql",
        "NAME": os.getenv("DATABASE_NAME", "xshop"),
        "USER": os.getenv("DATABASE_USER", "nova"),
        "HOST": os.getenv("DATABASE_HOST", "127.0.0.1"),
        "PORT": os.getenv("DATABASE_PORT", 3306),
        "OPTIONS": {
            "init_command": "SET default_storage_engine=INNODB",
        },
    }
}