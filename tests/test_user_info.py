from rest_framework.test import APITestCase
from django.conf import settings
from store.models import User
from rest_framework_simplejwt.tokens import RefreshToken

class UserInfoTests(APITestCase):
    def setUp(self):
        password_hashed_default = settings.PASSWORD_HASHED_DEFAULT
        self.username = "test"
        self.user = User.objects.create(
            username=self.username,
            email="test@example.com",
            hashed_password=password_hashed_default,
        )

        self.admin_name = "admin"
        self.admin = User.objects.create(
            username=self.admin_name,
            email="admin@example.com",
            role="admin",
            hashed_password=password_hashed_default,
        )

        refresh = RefreshToken.for_user(user=self.user)
        self.token = str(refresh.access_token)
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {self.token}')

        refresh = RefreshToken.for_user(user=self.admin)
        self.admin_token = str(refresh.access_token)

        self.email = "test@example.com"
        self.payload_modify_user_info = {
            "firstname": "Test",
            "lastname": "User",
            "gender": "Male",
            "email": self.email,
            "phone": "phone_number",
            
            "home_address": "test_home_address",
            "home_number": "test_home_number",
            "city": "test_city",
            "state": "test_state",
            "zip": "test_zip",

            "bankname": "test_bank",
            "account_holder": "Test User",
            "account_number": "test_account_number"
        }

    def test_get_user_info_without_perms(self):
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer ')
        response = self.client.get("/api/info")
        self.assertEqual(response.status_code, 401)

    def test_get_user_info_with_perms(self):
        response = self.client.get("/api/info")
        self.assertEqual(response.status_code, 200)

    def test_modify_user_info_without_perms(self):
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer ')
        response = self.client.post("/api/info",
            data=self.payload_modify_user_info)
        self.assertEqual(response.status_code, 401)

    def test_modify_user_info_with_perms(self):
        response = self.client.post("/api/info",
            data=self.payload_modify_user_info)
        self.assertEqual(response.status_code, 200)
        
        user_info = response.data
        self.assertEqual(user_info.get("email"), self.email)