from drf_spectacular.utils import OpenApiTypes, extend_schema_field
from rest_framework import serializers

from .models import MenuItem, Order, OrderItem, UserInfo


class MenuItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = MenuItem
        fields = [
            "id",
            "name",
            "price",
            "image",
            "image_upload_url",
            "is_chef_special",
            "category",
            "available",
            "description",
            "updated_by",
        ]


class OrderItemSerializer(serializers.ModelSerializer):
    name = serializers.SerializerMethodField()
    unit_price = serializers.SerializerMethodField()
    total_price = serializers.SerializerMethodField()
    image_upload_url = serializers.SerializerMethodField()

    class Meta:
        model = OrderItem
        fields = [
            "id",
            "menu_item",
            "order",
            "quantity",
            "date_added",
            "name",
            "unit_price",
            "total_price",
            "image_upload_url",
        ]

    @extend_schema_field(OpenApiTypes.STR)
    def get_name(self, obj):
        return obj.menu_item.name

    @extend_schema_field(OpenApiTypes.FLOAT)
    def get_unit_price(self, obj):
        return obj.menu_item.price

    @extend_schema_field(OpenApiTypes.FLOAT)
    def get_total_price(self, obj):
        return obj.get_total

    @extend_schema_field(OpenApiTypes.STR)
    def get_image_upload_url(self, obj):
        return obj.menu_item.image_upload_url


class OrderSerializer(serializers.ModelSerializer):
    formatted_date_ordered = serializers.CharField(read_only=True)
    items = OrderItemSerializer(source="orderitem_set", many=True, read_only=True)
    total = serializers.DecimalField(
        source="get_cart_total", max_digits=20, decimal_places=2, read_only=True, coerce_to_string=False
    )

    class Meta:
        model = Order
        fields = ["id", "user", "date_ordered", "formatted_date_ordered", "complete", "items", "total"]


class UserInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserInfo
        fields = ["id", "firstname", "lastname", "date_of_birth", "gender", "email", "phone"]
