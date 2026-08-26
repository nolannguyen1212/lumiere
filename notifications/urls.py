from django.urls import path

from . import views

urlpatterns = [
    path("notifications", views.NotificationListView.as_view(), name="notification-list"),
    path("notifications/read", views.MarkNotificationsReadView.as_view(), name="notification-mark-read"),
]
