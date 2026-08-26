import uuid

from django.db import models

from authen.models import User
from menu.models import Order


class NotificationKind(models.TextChoices):
    ORDER = "order", "Order"
    INFO = "info", "Info"


class Notification(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="notifications")
    order = models.ForeignKey(Order, on_delete=models.CASCADE, null=True, blank=True)
    kind = models.CharField(max_length=20, choices=NotificationKind.choices, default=NotificationKind.INFO)
    message = models.CharField(max_length=255)
    read = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self) -> str:
        return self.message
