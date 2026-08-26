from rest_framework.test import APITestCase


class UserRegisterTests(APITestCase):
    def setUp(self):
        self.profile_fields = {
            "firstname": "Test",
            "lastname": "User",
            "date_of_birth": "1990-01-01",
            "gender": "M",
            "phone": "555-0100",
        }

        self.payload_test_register = {
            "username": "test",
            "email": "test@example.com",
            "password": "password",
            "password_confirm": "password",
            **self.profile_fields,
        }

        self.duplicated_username = "test"
        self.payload_test_register_existed_username = [
            {
                "username": self.duplicated_username,
                "email": "test1@example.com",
                "password": "password",
                "password_confirm": "password",
                **self.profile_fields,
            },
            {
                "username": self.duplicated_username,
                "email": "test2@example.com",
                "password": "password",
                "password_confirm": "password",
                **self.profile_fields,
            },
        ]

        self.duplicated_email = "test@example.com"
        self.payload_test_register_existed_email = [
            {
                "username": "test1",
                "email": self.duplicated_email,
                "password": "password",
                "password_confirm": "password",
                **self.profile_fields,
            },
            {
                "username": "test2",
                "email": self.duplicated_email,
                "password": "password",
                "password_confirm": "password",
                **self.profile_fields,
            },
        ]

    def test_register_user(self):
        response = self.client.post("/api/users/signup", data=self.payload_test_register)
        self.assertEqual(response.status_code, 201)

    def test_register_mismatched_passwords(self):
        payload = {**self.payload_test_register, "password_confirm": "different"}
        response = self.client.post("/api/users/signup", data=payload)
        self.assertEqual(response.status_code, 400)

    def test_register_existed_username(self):
        self.client.post("/api/users/signup", data=self.payload_test_register_existed_username[0])
        response = self.client.post("/api/users/signup", data=self.payload_test_register_existed_username[1])

        self.assertEqual(response.status_code, 400)
        error_message = response.data.get("non_field_errors")[0]
        self.assertEqual(error_message, "User username need to be unique!")

    def test_register_existed_email(self):
        self.client.post("/api/users/signup", data=self.payload_test_register_existed_email[0])
        response = self.client.post("/api/users/signup", data=self.payload_test_register_existed_email[1])

        self.assertEqual(response.status_code, 400)
        error_message = response.data.get("email")[0]
        self.assertEqual(error_message, "user with this email already exists.")
