from rest_framework import serializers


class CreatePaymentIntentSerializer(serializers.Serializer):
    order_id = serializers.UUIDField()


class PaymentSucceededSerializer(serializers.Serializer):
    client_secret = serializers.CharField()


class PaymentFailedSerializer(serializers.Serializer):
    error = serializers.CharField()
