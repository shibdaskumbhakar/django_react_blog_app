from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import AllowAny, IsAuthenticated
from blog.models import Post
from blog.serializer import PostSerializer
from blog.permissions import IsPostOwner
from blog.utils import CustomPagination
from rest_framework.views import APIView
from blog_backend.utils import Response, ResponseMessage
from rest_framework import status


class PostViewSet(ModelViewSet):
    permission_classes = [AllowAny]
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    lookup_field = 'slug'
    pagination_class = CustomPagination
    
    def get_serializer_context(self):
        return {"request": self.request}

    def get_permissions(self):
        if self.request.method == 'GET':
            self.permission_classes = [AllowAny, ]
        elif self.request.method == 'POST':
            self.permission_classes = [IsAuthenticated]
        else:
            self.permission_classes = [IsAuthenticated, IsPostOwner, ]
        return super(PostViewSet, self).get_permissions()



class GetAllOwnerPost(ModelViewSet):
    permission_classes = [IsAuthenticated]
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    lookup_field = 'slug'
    pagination_class = CustomPagination
    http_method_names = ['get']
    
    def get_serializer_context(self):
        return {"request": self.request}
    
    def get_queryset(self):
        queryset = Post.objects.filter(user=self.request.user)
        return queryset
