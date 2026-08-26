from django.contrib.auth import authenticate
from rest_framework import serializers

from menu.models import GenderType, UserInfo

from .models import User


class UserLoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField()

    def validate(self, attrs):
        email = attrs.get("email")
        password = attrs.get("password")

        if not email or not password:
            raise serializers.ValidationError("Email and password can't be empty!")

        user = authenticate(request=self.context.get("request"), email=email, password=password)
        if user is None:
            raise serializers.ValidationError("Email or password is not correct!")

        attrs["user"] = user
        return attrs


class UserRegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    password_confirm = serializers.CharField(write_only=True)
    firstname = serializers.CharField(max_length=50)
    lastname = serializers.CharField(max_length=50)
    date_of_birth = serializers.CharField(max_length=50, required=False, allow_blank=True)
    gender = serializers.ChoiceField(choices=GenderType.choices)
    phone = serializers.CharField(max_length=50)

    class Meta:
        model = User
        fields = [
            "username",
            "email",
            "password",
            "password_confirm",
            "firstname",
            "lastname",
            "date_of_birth",
            "gender",
            "phone",
        ]

    def validate(self, attrs):
        if User.objects.filter(username=attrs["username"]).exists():
            raise serializers.ValidationError("User username need to be unique!")
        if attrs["password"] != attrs["password_confirm"]:
            raise serializers.ValidationError("Passwords don't match!")
        return attrs

    def create(self, validated_data):
        validated_data.pop("password_confirm")
        password = validated_data.pop("password")
        firstname = validated_data.pop("firstname")
        lastname = validated_data.pop("lastname")
        date_of_birth = validated_data.pop("date_of_birth", "")
        gender = validated_data.pop("gender")
        phone = validated_data.pop("phone")

        user = User.objects.create_user(password=password, **validated_data)
        UserInfo.objects.create(
            user=user,
            firstname=firstname,
            lastname=lastname,
            date_of_birth=date_of_birth,
            gender=gender,
            email=validated_data["email"],
            phone=phone,
        )
        return user


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "email", "role", "is_active", "date_joined"]
        read_only_fields = fields
