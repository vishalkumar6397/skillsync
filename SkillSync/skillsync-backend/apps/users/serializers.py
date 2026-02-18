from rest_framework import serializers
from django.contrib.auth import authenticate
from django.contrib.auth.password_validation import validate_password
from .models import User


# =========================
# AUTH SERIALIZERS
# =========================

from rest_framework import serializers
from django.contrib.auth.password_validation import validate_password
from .models import User


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(
        write_only=True,
        validators=[validate_password]
    )
    password2 = serializers.CharField(
        write_only=True,
        required=False
    )
    name = serializers.CharField(
        required=False,
        allow_blank=True
    )

    class Meta:
        model = User
        fields = ("id", "email", "name", "password", "password2")

    def validate(self, attrs):
        password = attrs.get("password")
        password2 = attrs.get("password2")

        # If password2 is provided, enforce match
        if password2 and password != password2:
            raise serializers.ValidationError({
                "password": "Passwords do not match"
            })

        return attrs

    def create(self, validated_data):
        validated_data.pop("password2", None)
        password = validated_data.pop("password")

        user = User.objects.create_user(
            email=validated_data["email"],
            password=password,
            name=validated_data.get("name", "")
        )
        return user


class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)

    def validate(self, data):
        user = authenticate(
            request=self.context.get("request"),
            email=data["email"],
            password=data["password"],
        )

        if not user:
            raise serializers.ValidationError("Invalid email or password")

        return user



class UserSerializer(serializers.ModelSerializer):
    """
    Used for:
    - login response
    - /api/auth/me/
    """
    class Meta:
        model = User
        fields = ("id", "email", "name")


# =========================
# USER PROFILE SERIALIZERS
# =========================

class UserProfileSerializer(serializers.ModelSerializer):
    """
    Used for:
    - GET /api/users/profile/
    - PUT /api/users/profile/
    """
    class Meta:
        model = User
        fields = ("id", "email", "name", "avatar")
        read_only_fields = ("id", "email")


class ChangePasswordSerializer(serializers.Serializer):
    """
    Used for:
    - POST /api/users/change-password/
    """
    old_password = serializers.CharField()
    new_password = serializers.CharField(validators=[validate_password])
