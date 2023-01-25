from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework import serializers
from django.contrib.auth.models import User
from accounts.models import Otp, UserProfile
from django.contrib.auth.hashers import make_password



class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = ['id', 'bio', 'profile_image']


class UserRegistrationSerializer(serializers.ModelSerializer):
    profile = UserProfileSerializer(required=True, write_only=True)

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name', 'password', 'profile']
        extra_kwargs = {
            'password':{'write_only': True},
            'email':{'required': True},
        }

    def validate_email(self, value):
        try:
            User.objects.get(email=value)
            raise serializers.ValidationError({"Email": "Email Already Exists"})
        except User.DoesNotExist:
            return value

    def to_representation(self, instance):
        data = super(UserRegistrationSerializer, self).to_representation(instance)
        data.update({'profile':UserProfileSerializer(instance.userprofile).data})
        return data

    def create(self, validated_data):
        profile_data = validated_data.pop('profile')
        password = validated_data.pop('password')

        user = User(**validated_data)
        user.set_password(password)
        user.save()

        UserProfile.objects.create(user=user, **profile_data)
        
        return user


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        exclude = ('is_staff', 'is_superuser', 'groups', 'user_permissions', 'password')
        

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):

    @classmethod
    def get_token(cls, user):
        token = super(CustomTokenObtainPairSerializer, cls).get_token(user)
        token['email'] = user.email
        return token
    
    def validate(self, attrs):
        data = super().validate(attrs)

        refresh = self.get_token(self.user)

        data["refresh"] = str(refresh)
        data["access"] = str(refresh.access_token)
        user = UserSerializer(self.user)
        data['user'] = user.data

        return data


class RefreshTokenSerializer(serializers.Serializer):
    refresh = serializers.CharField(required=True)


class ForgatePasswordSerializer(serializers.Serializer):
    username = serializers.CharField(required=True)

    def validate_username(self, value):
        try:
            user = User.objects.get(username=value)
            return value
        except User.DoesNotExist:
            raise serializers.ValidationError({"username": "Username not exists"})


class SavePasswordSerializer(serializers.Serializer):
    username = serializers.CharField(required=True)
    otp = serializers.CharField(required=True)
    password = serializers.CharField(required=True)

    def validate_username(self, value):
        try:
            user = User.objects.get(username=value)
            return value
        except User.DoesNotExist:
            raise serializers.ValidationError({"username": "Invalid Username"})

    def validate(self, attrs):
        try:
            otp = Otp.objects.get(user__username=attrs['username'], otp=attrs['otp'])
        except Otp.DoesNotExist:
            raise serializers.ValidationError({"otp": "Invalid OTP"})

        if otp.otp != attrs['otp']:
            raise serializers.ValidationError({"otp": "Invalid OTP"})

        return attrs

    def create(self, validated_data):
        try:
            otp_obj = Otp.objects.get(user__username=validated_data['username'], otp=validated_data['otp'])
            user = User.objects.filter(username=otp_obj.user.username).first()
            user.password = make_password(validated_data['password'])
            user.save()
            otp_obj.delete()
            return True
        except Exception as e:
            return str(e)
        

class ChangePasswordSerializer(serializers.Serializer):
    password = serializers.CharField(write_only=True, required=True)
    password2 = serializers.CharField(write_only=True, required=True)
    old_password = serializers.CharField(write_only=True, required=True)

    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError({"password": "Password fields didn't match."})

        return attrs

    def validate_old_password(self, value):
        user = self.context['request'].user
        if not user.check_password(value):
            raise serializers.ValidationError({"old_password": "Old password is not correct"})
        return value

    def update(self, instance, validated_data):
        instance.set_password(validated_data['password'])
        instance.save()

        return instance