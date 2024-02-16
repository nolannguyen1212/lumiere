from django.urls import path, include
from . import views

urlpatterns = [
    path("", views.EcoinFrontendView.as_view(), name="frontend-view"),
]
