from .base import AuthenticatedAPITestCase


class UserLoginTests(AuthenticatedAPITestCase):
    def setUp(self):
        self.email = "test@example.com"
        self.password = "password"
        self.create_user(username="test", email=self.email, password=self.password)

        self.payload_login = {"email": self.email, "password": self.password}
        self.payload_login_empty_email = {"email": "", "password": self.password}
        self.payload_login_empty_password = {"email": self.email, "password": ""}
        self.payload_login_incorrect_info = {
            "email": self.email,
            "password": self.password + "wrong_password",
        }

    def test_user_login(self):
        response = self.client.post("/users/login", data=self.payload_login)
        self.assertEqual(response.status_code, 200)

    def test_user_login_empty_email(self):
        response = self.client.post("/users/login", data=self.payload_login_empty_email)
        self.assertEqual(response.status_code, 400)

    def test_user_login_empty_pwd(self):
        response = self.client.post("/users/login", data=self.payload_login_empty_password)
        self.assertEqual(response.status_code, 400)

    def test_user_login_incorrect(self):
        response = self.client.post("/users/login", data=self.payload_login_incorrect_info)
        self.assertEqual(response.status_code, 400)
