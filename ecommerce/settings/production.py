from .base import *

# Security
ALLOWED_HOSTS = ["*"]
CORS_ALLOW_ALL_ORIGINS = True
CORS_ALLOW_CREDENTIALS = True
CSRF_TRUSTED_ORIGINS = ["https://ecoinbe.chilly-male.wonderfulshed.xyz", "https://ecoin-nova.xyz", "https://ecoinfe.chilly-male.wonderfulshed.xyz"]

# Database
DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.mysql",
        "NAME": os.getenv("DATABASE_NAME", "ecoin"),
        "USER": os.getenv("DATABASE_USER", "root"),
        "PASSWORD": os.getenv("DATABASE_PASSWORD", "password"),
        "HOST": os.getenv("DATABASE_HOST", "localhost"),
        "PORT": os.getenv("DATABASE_PORT", 3306),
        "OPTIONS": {
            "init_command": "SET default_storage_engine=INNODB",
        },
    }
}