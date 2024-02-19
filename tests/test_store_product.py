import unittest
from ecommerce import settings
from authen.models import User
from store.models import Product
from rest_framework.test import APITestCase
from rest_framework_simplejwt.tokens import RefreshToken

class StoreProductTest(APITestCase):
    def setUp(self):
        password_hashed_default = settings.PASSWORD_HASHED_DEFAULT
        self.user = User.objects.create(
            username="test",
            email="test@example.com",
            hashed_password=password_hashed_default,
        )

        self.admin = User.objects.create(
            username="admin",
            email="admin@example.com",
            role="admin",
            hashed_password=password_hashed_default,
        )

        refresh = RefreshToken.for_user(user=self.user)
        self.token = str(refresh.access_token)
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {self.token}')

        refresh = RefreshToken.for_user(user=self.admin)
        self.admin_token = str(refresh.access_token)

        self.product_name = "product_test"
        self.product = Product.objects.create(
            name=self.product_name,
            price=100,
            digital=True,
            imageUploadURL="",
            instock=True,
            updatedBy="test_user",
        )

        self.payload_test_product = {
            "name": "test_product",
            "price": 100,
            "digital": False,
            "image_upload_url": "",
        }
        

    def tearDown(self):
        Product.objects.filter(name="product_test").delete()

    def test_api_without_perm(self):
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer ')
        response = self.client.get("/api/products")
        self.assertEquals(response.status_code, 401)


    def test_get_all_products(self):
        response = self.client.get("/api/products")
        self.assertEquals(response.status_code, 200)
        data = response.data
        self.assertEquals(len(data), 1)

    def test_get_a_product(self):
        response = self.client.get(f"/api/products/{self.product.id}")
        self.assertEquals(response.status_code, 200)
        data = response.data
        self.assertEquals(len(data), 1)
        product = data.get("product")
        self.assertEquals(product.get("name"), self.product_name)

    def test_get_undefined_product(self):
        undefined_id = -1
        response = self.client.get(f"/api/products/{-1}")
        self.assertEquals(response.status_code, 404)

    def test_create_new_product_without_admin_perm(self):
        response = self.client.post("/api/products",
            data=self.payload_test_product)
        self.assertEquals(response.status_code, 400)
        data = response.data
        error = data.get("errors")
        self.assertEquals(error, "You need to have role admin!")
    
    def test_create_new_product_with_admin_perm(self):
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {self.admin_token}')

        response = self.client.post("/api/products",
            data=self.payload_test_product)
        
        self.assertEquals(response.status_code, 201)