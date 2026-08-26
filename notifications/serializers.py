from rest_framework import serializers

from .models import Notification


class NotificationSerializer(serializers.ModelSerializer):
    order = serializers.PrimaryKeyRelatedField(read_only=True, pk_field=serializers.UUIDField())

    class Meta:
        model = Notification
        fields = ["id", "kind", "message", "order", "read", "created_at"]
        read_only_fields = fields
