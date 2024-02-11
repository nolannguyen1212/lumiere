from django.shortcuts import render
from rest_framework.views import APIView

# Create your views here.

import stripe
from django.conf import settings
from rest_framework.response import Response
from rest_framework import status

stripe.api_key = settings.STRIPE_SECRET_KEY

class PaymentView(APIView):
    def post(self, request, *args, **kwargs):
        try:
            intent = stripe.PaymentIntent.create(
                amount=request.data['amount'],
                currency='usd',
            )
            return Response({'clientSecret': intent.client_secret}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)