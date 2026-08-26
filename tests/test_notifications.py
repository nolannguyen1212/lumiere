from channels.testing import WebsocketCommunicator
from django.test import TransactionTestCase
from rest_framework_simplejwt.tokens import RefreshToken

from authen.models import User
from lumiere.asgi import application
from menu.models import Order
from notifications.models import Notification
from notifications.services import notify_user

from .base import AuthenticatedAPITestCase


class NotificationRestTests(AuthenticatedAPITestCase):
    def setUp(self):
        self.user = self.create_user(username="test", email="test@example.com")
        self.authenticate(self.user)
        notify_user(self.user, "First notification")
        notify_user(self.user, "Second notification")

    def test_list_notifications_without_perms(self):
        self.clear_authentication()
        response = self.client.get("/api/notifications")
        self.assertEqual(response.status_code, 401)

    def test_list_notifications_with_perms(self):
        response = self.client.get("/api/notifications")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data["unread_count"], 2)
        self.assertEqual(len(response.data["notifications"]), 2)

    def test_mark_notifications_read(self):
        response = self.client.post("/api/notifications/read")
        self.assertEqual(response.status_code, 204)
        self.assertEqual(Notification.objects.filter(user=self.user, read=False).count(), 0)


class NotificationWebsocketTests(TransactionTestCase):
    async def test_receives_notification_on_order_complete(self):
        from channels.db import database_sync_to_async

        user = await database_sync_to_async(User.objects.create_user)(
            username="wsuser", email="ws@example.com", password="password"
        )
        token = str(RefreshToken.for_user(user).access_token)

        communicator = WebsocketCommunicator(application, f"/ws/notifications/?token={token}")
        connected, _ = await communicator.connect()
        self.assertTrue(connected)

        order = await database_sync_to_async(Order.objects.create)(user=user, complete=False)
        await database_sync_to_async(notify_user)(user, "Your order has been placed!", kind="order", order=order)

        response = await communicator.receive_json_from()
        self.assertEqual(response["message"], "Your order has been placed!")

        await communicator.disconnect()

    async def test_rejects_connection_without_token(self):
        communicator = WebsocketCommunicator(application, "/ws/notifications/")
        connected, _ = await communicator.connect()
        self.assertFalse(connected)
