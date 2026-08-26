from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

from . import views

urlpatterns = [
    path("me", views.UserView.as_view(), name="user_info"),
    path("login", views.Login.as_view(), name="login"),
    path("signup", views.Register.as_view(), name="signup"),
    path("token", TokenObtainPairView.as_view(), name="token_obtain_view"),
    path("token/refresh", TokenRefreshView.as_view(), name="token_refresh_view"),
]
