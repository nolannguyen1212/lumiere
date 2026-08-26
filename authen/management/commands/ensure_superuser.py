import os

from django.core.management.base import BaseCommand

from authen.models import User


class Command(BaseCommand):
    help = "Create a superuser from DJANGO_SUPERUSER_* env vars if one doesn't already exist."

    def handle(self, *args, **options):
        email = os.getenv("DJANGO_SUPERUSER_EMAIL")
        password = os.getenv("DJANGO_SUPERUSER_PASSWORD")
        username = os.getenv("DJANGO_SUPERUSER_USERNAME", "admin")

        if not email or not password:
            self.stdout.write("DJANGO_SUPERUSER_EMAIL/PASSWORD not set, skipping.")
            return

        if User.objects.filter(email=email).exists():
            self.stdout.write(f"Superuser {email} already exists, skipping.")
            return

        User.objects.create_superuser(username=username, email=email, password=password)
        self.stdout.write(f"Created superuser {email}.")
