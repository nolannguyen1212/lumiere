from django.urls import path

from . import views

urlpatterns = [
    path("menu", views.MenuView.as_view(), name="menu-view"),
    path("menu/<uuid:id>", views.MenuItemView.as_view(), name="menu-item-view"),
    path("orders", views.OrderViewset.as_view({"get": "get", "post": "post", "put": "put"}), name="order-view"),
    path(
        "orders/userid/<uuid:user_id>",
        views.OrderViewset.as_view({"get": "get_by_userid"}),
        name="order-by-userid",
    ),
    path("order-items", views.OrderItemView.as_view(), name="order-item-view"),
    path("info", views.UserInfoView.as_view(), name="user-info"),
]
