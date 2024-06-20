from django.shortcuts import render
from rest_framework.views import APIView

# Create your views here.

import stripe
from django.conf import settings
from rest_framework.response import Response
from rest_framework import status
from drf_spectacular.utils import extend_schema
from .serializers import PaymentSuccessedSerializer, PaymentFailedSerializer

stripe.api_key = settings.STRIPE_SECRET_KEY

class PaymentView(APIView):
    serializer_class = []

    @extend_schema(
        request=None,
        responses={
            200: PaymentSuccessedSerializer,
            500: PaymentFailedSerializer
        },
        description="Create a Stripe PaymentIntent and return the client secret."
    )
    def post(self, request, *args, **kwargs):
        data = request.data
        amount = data.get('amount')
        try:
            intent = stripe.PaymentIntent.create(
                amount=int(amount * 1000),
                currency='usd',
                automatic_payment_methods={
                    'enabled': True,
                },
            )
            return Response({'clientSecret': intent.client_secret}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)