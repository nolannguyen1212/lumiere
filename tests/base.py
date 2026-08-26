from rest_framework.test import APITestCase
from rest_framework_simplejwt.tokens import RefreshToken

from authen.models import User


class AuthenticatedAPITestCase(APITestCase):
    def create_user(self, **kwargs):
        kwargs.setdefault("username", "test")
        kwargs.setdefault("email", "test@example.com")
        kwargs.setdefault("password", "password")
        return User.objects.create_user(**kwargs)

    def authenticate(self, user):
        token = str(RefreshToken.for_user(user).access_token)
        self.client.credentials(HTTP_AUTHORIZATION=f"Bearer {token}")

    def clear_authentication(self):
        self.client.credentials()
