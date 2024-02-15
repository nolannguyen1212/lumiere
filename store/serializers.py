from rest_framework import serializers
from .models import (
    Product, Order, 
    OrderItem, UserInfo
)

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = "__all__"

class OrderSerializer(serializers.ModelSerializer):
    formatted_date_ordered = serializers.CharField(source='formatted_date_ordered', read_only=True)

    class Meta:
        model = Order
        fields = "__all__"

class OrderItemSerializer(serializers.ModelSerializer):
    name = serializers.SerializerMethodField()
    unit_price = serializers.SerializerMethodField()
    total_price = serializers.SerializerMethodField()
    order = serializers.SerializerMethodField

    class Meta:
        model = OrderItem
        fields = "__all__"

    def get_name(self, obj):
        return obj.product.name
    
    def get_unit_price(self, obj):
        return obj.product.price

    def get_total_price(self, obj):
        total = obj.product.price * obj.quantity
        return total
    
    def get_order(self, obj):
        return obj.order

class UserInfoSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = UserInfo
        fields = "__all__"