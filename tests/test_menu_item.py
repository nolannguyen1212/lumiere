from rest_framework_simplejwt.tokens import RefreshToken

from menu.models import MenuItem

from .base import AuthenticatedAPITestCase


class MenuItemTest(AuthenticatedAPITestCase):
    def setUp(self):
        self.user = self.create_user(username="test", email="test@example.com")
        self.admin = self.create_user(username="admin", email="admin@example.com", role="admin")
        self.authenticate(self.user)

        self.admin_token = str(RefreshToken.for_user(self.admin).access_token)

        self.menu_item_name = "menu_item_test"
        self.menu_item = MenuItem.objects.create(
            name=self.menu_item_name,
            price=100,
            image_upload_url="",
            available=True,
            updated_by=self.user,
        )

        self.payload_test_menu_item = {
            "name": "test_menu_item",
            "price": 100,
            "image_upload_url": "",
        }

    def tearDown(self):
        MenuItem.objects.filter(name="menu_item_test").delete()

    def test_get_all_menu_items_without_perm(self):
        self.clear_authentication()
        response = self.client.get("/api/menu")
        self.assertEqual(response.status_code, 200)

    def test_get_all_menu_items(self):
        response = self.client.get("/api/menu")
        self.assertEqual(response.status_code, 200)
        data = response.data
        self.assertEqual(data["count"], 1)

    def test_get_a_menu_item_without_perm(self):
        self.clear_authentication()
        response = self.client.get(f"/api/menu/{self.menu_item.id}")
        self.assertEqual(response.status_code, 200)

    def test_get_a_menu_item(self):
        response = self.client.get(f"/api/menu/{self.menu_item.id}")
        self.assertEqual(response.status_code, 200)
        data = response.data
        self.assertEqual(len(data), 1)
        menu_item = data.get("menu_item")
        self.assertEqual(menu_item.get("name"), self.menu_item_name)

    def test_get_undefined_menu_item(self):
        undefined_id = -1
        response = self.client.get(f"/api/menu/{undefined_id}")
        self.assertEqual(response.status_code, 404)

    def test_create_new_menu_item_without_admin_perm(self):
        response = self.client.post("/api/menu", data=self.payload_test_menu_item)
        self.assertEqual(response.status_code, 403)

    def test_create_new_menu_item_with_admin_perm(self):
        self.client.credentials(HTTP_AUTHORIZATION=f"Bearer {self.admin_token}")

        response = self.client.post("/api/menu", data=self.payload_test_menu_item)

        self.assertEqual(response.status_code, 201)
