import stripe
from django.conf import settings
from django.shortcuts import get_object_or_404
from drf_spectacular.utils import extend_schema
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from menu.models import Order

from .models import Payment
from .serializers import (
    CreatePaymentIntentSerializer,
    PaymentFailedSerializer,
    PaymentSucceededSerializer,
)

stripe.api_key = settings.STRIPE_SECRET_KEY


class PaymentView(APIView):
    serializer_class = CreatePaymentIntentSerializer

    @extend_schema(
        request=CreatePaymentIntentSerializer,
        responses={
            200: PaymentSucceededSerializer,
            400: PaymentFailedSerializer,
            502: PaymentFailedSerializer,
        },
        description="Create a Stripe PaymentIntent for the caller's own order and return the client secret.",
    )
    def post(self, request, *args, **kwargs):
        serializer = CreatePaymentIntentSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        order = get_object_or_404(Order, id=serializer.validated_data["order_id"], user=request.user)
        amount = order.get_cart_total

        try:
            intent = stripe.PaymentIntent.create(
                amount=int(amount * 100),
                currency="usd",
                automatic_payment_methods={"enabled": True},
            )
        except stripe.error.StripeError as error:
            return Response(
                PaymentFailedSerializer({"error": str(error)}).data,
                status=status.HTTP_502_BAD_GATEWAY,
            )

        Payment.objects.create(
            order=order,
            stripe_payment_intent_id=intent.id,
            amount=amount,
        )

        return Response(
            PaymentSucceededSerializer({"client_secret": intent.client_secret}).data,
            status=status.HTTP_200_OK,
        )
