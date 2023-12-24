from django.urls import path, include
from rest_framework import routers
from . import views

router = routers.DefaultRouter()
router.register(r"orders", viewset=views.OrderViewset, basename="order-viewset")

urlpatterns = [
    path('', include(router.urls)),
    path("products", view=views.StoreProductsView.as_view(), name="store-products-view"),
    path("products/<int:id>", view=views.ProductView.as_view(), name="product-view"),
    path("orders", view=views.OrderViewset.as_view({"get": "get", "post": "post"}), name="order-view"),
    path("order-items", view=views.OrderItemView.as_view(), name="order-item-view"),
]
