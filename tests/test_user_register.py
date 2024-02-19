from rest_framework.test import APITestCase, APIClient
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken

class UserRegisterTests(APITestCase):
    def setUp(self):
        self.payload_test_register = {
            "username": "test",
            "email": "test@example.com",
            "password": "password",
            "password_confirm": "password"
        }

        self.duplicated_username = "test"
        self.payload_test_register_existed_username = [
            {
                "username": self.duplicated_username,
                "email": "test1@example.com",
                "password": "password",
                "password_confirm": "password",
            },
            {
                "username": self.duplicated_username,
                "email": "test2@example.com",
                "password": "password",
                "password_confirm": "password",
            }
        ]

        self.duplicated_email = "test@example.com"
        self.payload_test_register_existed_email = [
            {
                "username": "test1",
                "email": self.duplicated_email,
                "password": "password",
                "password_confirm": "password",
            },
            {
                "username": "test2",
                "email": self.duplicated_email,
                "password": "password",
                "password_confirm": "password",
            }
        ]

    def test_register_user(self):
        response = self.client.post("/users/signup", data=self.payload_test_register)
        self.assertEquals(response.status_code, 201)

    def test_register_existed_username(self):
        # create user first time
        self.client.post("/users/signup", 
            data=self.payload_test_register_existed_username[0])

        # create user second time
        response = self.client.post("/users/signup", 
            data=self.payload_test_register_existed_username[1])
        
        # check status code
        self.assertEquals(response.status_code, 400)

        # check error message
        error_message = response.data.get('non_field_errors')[0]
        self.assertEquals(error_message, "User username need to be unique!")
    
    def test_register_existed_email(self):
        # create user first time
        self.client.post("/users/signup", 
            data=self.payload_test_register_existed_email[0])

        # create user second time
        response = self.client.post("/users/signup", 
            data=self.payload_test_register_existed_email[1])

        # check status code
        self.assertEquals(response.status_code, 400)

        # check error message
        error_message = response.data.get("email")[0]
        self.assertEquals(error_message, "user with this email already exists.")