from rest_framework import serializers

class PaymentSuccessedSerializer(serializers.Serializer):
    clientSecret = serializers.CharField()

class PaymentFailedSerializer(serializers.Serializer):
    error = serializers.CharField()