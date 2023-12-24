from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from django.conf.urls.static import static
from django.conf import settings
from . import views

urlpatterns = [
    path("me", view=views.UserView.as_view(), name="user_info"),
    path("login", view=views.Login.as_view(), name="login"),
    path("signup", view=views.Register.as_view(), name="signup"),
    path("token", view=TokenObtainPairView.as_view(), name="token_obtain_view"),
    path("token/refresh", view=TokenRefreshView.as_view(), name="token_refresh_view"),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)