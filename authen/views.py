from rest_framework.response import Response
from rest_framework.views import APIView

from .serializers import UserLoginSerializer, UserRegistrationSerializer, UserSerializer
from .utils.jwt_utils import get_token


class Login(APIView):
    authentication_classes = []
    permission_classes = []
    serializer_class = UserLoginSerializer

    def post(self, request):
        serializer = UserLoginSerializer(data=request.data, context={"request": request})
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data["user"]
        return Response(get_token(user), status=200)


class Register(APIView):
    authentication_classes = []
    permission_classes = []
    serializer_class = UserRegistrationSerializer

    def post(self, request):
        serializer = UserRegistrationSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response({"message": "Successfully registered user!"}, status=201)


class UserView(APIView):
    serializer_class = UserSerializer

    def get(self, request):
        serializer = UserSerializer(request.user)
        return Response({"user": serializer.data}, status=200)
