from django.db import models
from django.contrib.auth.models import User

class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    profile_image = models.ImageField(upload_to='images/', null=True, blank=True)
    bio = models.CharField(max_length=255, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self) -> str:
        return self.user.username


class Otp(models.Model):
    TYPE = (
        ('ForgotPassword','ForgotPassword'),
        ('ResetPassword','ResetPassword'),
    )
    
    otp = models.CharField(max_length=55)
    otp_type = models.CharField(max_length=55, choices=TYPE, default='ForgotPassword')
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    
    def __str__(self) -> str:
        return f"{self.user.username}-{self.otp_type}"