from django.db import models
from django.db.models.signals import pre_save
from django.dispatch import receiver
from blog.utils import unique_slug_generator
from django.contrib.auth.models import User


class Post(models.Model):
    title = models.CharField(max_length=255)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    slug = models.SlugField(max_length = 250, null = True, blank = True)
    text = models.TextField()
    image = models.ImageField(upload_to='images/', null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add = True)
    updated_at = models.DateTimeField(auto_now = True)

    class Meta:
       ordering = ('-created_at', )
 
    def __str__(self):
       return self.title



@receiver(pre_save, sender=Post)
def pre_save_receiver(sender, instance, *args, **kwargs):
   if not instance.slug:
       instance.slug = unique_slug_generator(instance)