from rest_framework.permissions import BasePermission
from blog.models import Post

class IsPostOwner(BasePermission):
    """
    Allows access only to POST Owner users.
    """

    def has_permission(self, request, view):
        slug = view.kwargs.get('slug', None)
        try:
            post = Post.objects.get(slug=slug)
            return bool(post.user == request.user and request.user.is_authenticated)
        except Post.DoesNotExist:
            return False
