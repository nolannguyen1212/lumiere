from django.urls import path
from . import views


urlpatterns = [
    path('create-checkout-session', views.PaymentView.as_view()),
]