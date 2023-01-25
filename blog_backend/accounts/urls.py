from django.contrib import admin
from django.urls import path
from accounts.views import (
    UserRegistrationView,
    CustomTokenObtainPairView, 
    LogoutView,
    LogoutAllView,
    ForgatePasswordView,
    SavePasswordView,
    ChnagePasswordView
)
from rest_framework_simplejwt.views import (
    TokenRefreshView,
)

urlpatterns = [
    path('register', UserRegistrationView.as_view(), name='token_obtain_pair'),
    path('token', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh', TokenRefreshView.as_view(), name='token_refresh'),
    path('logout', LogoutView.as_view(), name='auth_logout'),
    path('logout-all-device', LogoutAllView.as_view(), name='auth_logout_all'),
    path('forgot-password', ForgatePasswordView.as_view()),
    path('save-password', SavePasswordView.as_view()),
    path('change-password', ChnagePasswordView.as_view()),
]
