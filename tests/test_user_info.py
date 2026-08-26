from .base import AuthenticatedAPITestCase


class UserInfoTests(AuthenticatedAPITestCase):
    def setUp(self):
        self.user = self.create_user(username="test", email="test@example.com")
        self.admin = self.create_user(username="admin", email="admin@example.com", role="admin")
        self.authenticate(self.user)

        self.email = "test@example.com"
        self.payload_modify_user_info = {
            "firstname": "Test",
            "lastname": "User",
            "gender": "M",
            "email": self.email,
            "phone": "phone_number",
            "home_address": "test_home_address",
            "home_number": "test_home_number",
            "city": "test_city",
            "state": "test_state",
            "zip": "test_zip",
            "bankname": "test_bank",
            "account_holder": "Test User",
            "account_number": "test_account_number",
        }

    def test_get_user_info_without_perms(self):
        self.clear_authentication()
        response = self.client.get("/api/info")
        self.assertEqual(response.status_code, 401)

    def test_get_user_info_with_perms(self):
        response = self.client.get("/api/info")
        self.assertEqual(response.status_code, 200)

    def test_modify_user_info_without_perms(self):
        self.clear_authentication()
        response = self.client.post("/api/info", data=self.payload_modify_user_info)
        self.assertEqual(response.status_code, 401)

    def test_modify_user_info_with_perms(self):
        response = self.client.post("/api/info", data=self.payload_modify_user_info)
        self.assertEqual(response.status_code, 200)

        user_info = response.data
        self.assertEqual(user_info.get("email"), self.email)
