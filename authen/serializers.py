from rest_framework import serializers
from .models import User
import bcrypt


class UserLoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField()

    def validate(self, validated_data):
        email = validated_data.get("email")
        password = validated_data.get("password")

        if not email and not password:
            raise serializers.ValidationError("Email and password can't be empty!")

        if not User.objects.filter(email=email).exists():
            raise serializers.ValidationError("User doesn't exist!")

        user = User.objects.get(email=email)
        if not bcrypt.checkpw(
            password=password.encode("utf-8"),
            hashed_password=user.hashed_password.encode("utf-8"),
        ):  # password need to store in pybytes
            raise serializers.ValidationError("Password is not correct!")

        return validated_data


class UserRegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField()

    class Meta:
        model = User
        fields = ["username", "email", "role", "password"]

    def validate(self, validated_data):
        username = validated_data.get("username")
        email = validated_data.get("email")

        if User.objects.filter(email=email).exists():
            raise serializers.ValidationError("User email need to be unique!")

        if User.objects.filter(username=username).exists():
            raise serializers.ValidationError("User username need to be unique!")

        return validated_data

    def create(self, validated_data):
        password = validated_data["password"]
        del validated_data["password"]

        bytes = password.encode("utf-8") # encode password to pybytes
        validated_data["hashed_password"] = bcrypt.hashpw(
            bytes, bcrypt.gensalt()
        ).decode("utf-8")

        user = User.objects.create(**validated_data)
        return user


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = "__all__"
