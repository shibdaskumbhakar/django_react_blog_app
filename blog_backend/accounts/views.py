from django.shortcuts import render
from blog_backend.utils import Response, ResponseMessage
from rest_framework import status
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
)
from rest_framework_simplejwt.tokens import RefreshToken, OutstandingToken, BlacklistedToken
from accounts.serializer import (
    UserRegistrationSerializer,
    CustomTokenObtainPairSerializer, 
    RefreshTokenSerializer, 
    ForgatePasswordSerializer,
    SavePasswordSerializer,
    ChangePasswordSerializer
)
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated, AllowAny
from django.contrib.auth.models import User
from accounts.utils import create_forgot_password_otp
from django.contrib.auth.hashers import make_password
from accounts.models import Otp


class UserRegistrationView(APIView):
    permission_classes = (AllowAny,)

    def post(self, request):
        serializer = UserRegistrationSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(code=status.HTTP_205_RESET_CONTENT, data=serializer.data, status=True, message=ResponseMessage.SUCCESS)
        else:
            return Response(code=status.HTTP_400_BAD_REQUEST, data={}, status=False, message=serializer.errors)


class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer
    
    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        try:
            serializer.is_valid()
        except Exception as e:
            return Response(data={}, code=status.HTTP_400_BAD_REQUEST, message=str(e), status=False)
        
        return Response(data=serializer.validated_data, code=status.HTTP_200_OK, message=ResponseMessage.SUCCESS, status=True)
    

class LogoutView(APIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request):
        serializer = RefreshTokenSerializer(data=request.data)
        if serializer.is_valid():
            refresh_token = request.data["refresh"]
            token = RefreshToken(refresh_token)
            token.blacklist()

            return Response(code=status.HTTP_205_RESET_CONTENT, data={}, status=True, message=ResponseMessage.LOGOUT)
        else:
            return Response(code=status.HTTP_400_BAD_REQUEST, data={}, status=False, message=serializer.errors)


class LogoutAllView(APIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request):
        tokens = OutstandingToken.objects.filter(user_id=request.user.id)
        for token in tokens:
            t, _ = BlacklistedToken.objects.get_or_create(token=token)

        return Response(code=status.HTTP_205_RESET_CONTENT, data={}, status=True, message=ResponseMessage.LOGOUT)
    

class ForgatePasswordView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = ForgatePasswordSerializer(data=request.data)
        if serializer.is_valid():
            otp = create_forgot_password_otp(serializer.data['username'])
            if otp:
                print("Your Forgot Password OTP Is--------->", otp.otp)
                return Response(code=status.HTTP_200_OK, data={}, status=True, message=ResponseMessage.FORGOT_PASSWORD_OTP)
            else:
                return Response(code=status.HTTP_400_BAD_REQUEST, data={}, status=True, message=ResponseMessage.SOMETHING_WENT_WRONG)
        else:
            return Response(code=status.HTTP_400_BAD_REQUEST, data={}, status=False, message=serializer.errors)
            

class SavePasswordView(APIView):
    permission_classes = [AllowAny]
    
    def post(self, request):
        serializer = SavePasswordSerializer(data=request.data)

        if serializer.is_valid():
            result = serializer.save()
            if result:
                return Response(code=status.HTTP_200_OK, data={}, status=True, message=ResponseMessage.PASSWORD_CHANGED)
            else:
                return Response(code=status.HTTP_400_BAD_REQUEST, data={}, status=False, message=str(result))
        else:
            return Response(data={}, code=status.HTTP_400_BAD_REQUEST, message=serializer.errors, status=False)
        

class ChnagePasswordView(APIView):
    permission_classes = [IsAuthenticated]
    
    def put(self, request):
        serializer = ChangePasswordSerializer(request.user, data=request.data, context={"request":request})

        if serializer.is_valid():
            try:
                serializer.save()
                return Response(code=status.HTTP_200_OK, data={}, status=True, message=ResponseMessage.PASSWORD_CHANGED)
            except Exception as e:
                return Response(code=status.HTTP_400_BAD_REQUEST, data={}, status=False, message=ResponseMessage.Invalid_OTP)
        else:
            return Response(data={}, code=status.HTTP_400_BAD_REQUEST, message=serializer.errors, status=False)
        