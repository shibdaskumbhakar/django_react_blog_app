from django.contrib import admin
from accounts.models import UserProfile, Otp

admin.site.register(UserProfile)
admin.site.register(Otp)