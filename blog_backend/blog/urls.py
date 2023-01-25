from django.urls import path, include
from rest_framework import routers
from blog.views import PostViewSet, GetAllOwnerPost

post_api_router = routers.SimpleRouter()
post_api_router.register("post", PostViewSet)
post_api_router.register("owner", GetAllOwnerPost, basename='ownerPost')

urlpatterns = [
    path("", include(post_api_router.urls), name='post_api'),
]
