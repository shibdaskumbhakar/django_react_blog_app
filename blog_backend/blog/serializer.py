from rest_framework import serializers
from blog.models import Post
from django.contrib.auth.models import User
from accounts.serializer import UserSerializer


class PostSerializer(serializers.ModelSerializer):
    user = serializers.SerializerMethodField()
    class Meta:
        model = Post
        fields = ('id', 'title', 'text', 'image', 'user', 'slug', 'created_at')
        extra_kwargs = {
            'user':{'read_only': True},
            'slug':{'read_only': True},
            'created_at':{'read_only': True},
            'url': {'lookup_field': 'slug'}
        }

    def get_user(self, data):
        serializer = UserSerializer(data.user)
        return serializer.data

    def create(self, validated_data):
        request = self.context['request']
        validated_data.update({'user': request.user})
        post = Post.objects.create(**validated_data)
        return post