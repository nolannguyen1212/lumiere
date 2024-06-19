from rest_framework.test import APITestCase
from django.conf import settings
from authen.models import User

class UserLoginTests(APITestCase):
    def setUp(self):
        password_hashed_default = settings.PASSWORD_HASHED_DEFAULT
        user = User.objects.create(
            username="test",
            email="test@example.com",
            hashed_password=password_hashed_default,
        )

        self.email = "test@example.com"
        self.password = "password"
        
        self.payload_login = {
            "email": self.email,
            "password": self.password
        }

        self.payload_login_empty_email = {
            "email": "",
            "password": self.password
        }

        self.payload_login_empty_password = {
            "email": self.email,
            "password": ""
        }

        self.payload_login_incorrect_info = {
            "email": self.email,
            "password": self.password + "wrong_password"
        }

    def test_user_login(self):
        response = self.client.post("/users/login", 
            data=self.payload_login)
        
        self.assertEquals(response.status_code, 200)

    def test_user_login_empty_email(self):
        response = self.client.post("/users/login", 
            data=self.payload_login_empty_email)
        
        self.assertEquals(response.status_code, 400)

    def test_user_login_empty_pwd(self):
        response = self.client.post("/users/login", 
            data=self.payload_login_empty_password)
        
        self.assertEquals(response.status_code, 400)
    
    def test_user_login_incorrect(self):
        response = self.client.post("/users/login", 
            data=self.payload_login_incorrect_info)
        
        self.assertEquals(response.status_code, 400)