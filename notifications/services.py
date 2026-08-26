from asgiref.sync import async_to_sync
from channels.layers import get_channel_layer

from .models import Notification, NotificationKind
from .serializers import NotificationSerializer


def short_id(value):
    return str(value).replace("-", "")[:8].upper()


def notify_user(user, message, kind=NotificationKind.INFO, order=None):
    notification = Notification.objects.create(user=user, message=message, kind=kind, order=order)

    channel_layer = get_channel_layer()
    async_to_sync(channel_layer.group_send)(
        f"notifications_{user.id}",
        {"type": "notification.message", "data": NotificationSerializer(notification).data},
    )
    return notification
