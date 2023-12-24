from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import (
    UserLoginSerializer, 
    UserRegistrationSerializer, 
    UserSerializer
)
from .utils.jwt_utils import get_token
from .models import User

# Create your views here.


class Login(APIView):
    authentication_classes = []
    permission_classes = []

    def post(self, request):
        data = request.data
        serializer = UserLoginSerializer(data=data)

        if serializer.is_valid(raise_exception=True):
            validated_data = serializer.validated_data
            email = validated_data.get("email")
            user = User.objects.get(email=email)
            response = get_token(user)
            return Response(response, status=200)
        else:
            errors = serializer.errors
            return Response({"errors": errors}, status=400)


class Register(APIView):
    authentication_classes = []
    permission_classes = []

    def post(self, request):
        data = request.data
        serializer = UserRegistrationSerializer(data=data)

        if serializer.is_valid(raise_exception=True):
            validated_data = serializer.validated_data
            serializer.create(validated_data)
            return Response({"message": "Successfully registered user!"}, status=201)
        else:
            errors = serializer.errors
            return Response({"errors": errors}, status=400)

class UserView(APIView):
    def get(self, request):
        user = request.user
        try:
            user_info = User.objects.get(username=user)
            serializer = UserSerializer(user_info)
            return Response({"user": serializer.data}, status=200)
        except:
            return Response({"errors": "Missing authentication!"}, status=404)
        