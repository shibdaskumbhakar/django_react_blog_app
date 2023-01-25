from random import randint
from accounts.models import Otp
from django.contrib.auth.models import User

def generate_otp():
    return randint(100000, 999999)

def create_forgot_password_otp(username):
    user = User.objects.get(username=username)
    otp = Otp.objects.create(user=user, otp=generate_otp(), otp_type='ForgotPassword')
    return otp