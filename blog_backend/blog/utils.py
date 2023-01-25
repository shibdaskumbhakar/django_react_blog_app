import string, random
from django.db.models.signals import pre_save
from django.dispatch import receiver
from django.utils.text import slugify
from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response


def random_string_generator(size = 10, chars = string.ascii_lowercase + string.digits):
	return ''.join(random.choice(chars) for _ in range(size))

def unique_slug_generator(instance, new_slug = None):
	if new_slug is not None:
		slug = new_slug
	else:
		slug = slugify(instance.title)
	Klass = instance.__class__
	max_length = Klass._meta.get_field('slug').max_length
	slug = slug[:max_length]
	qs_exists = Klass.objects.filter(slug = slug).exists()
	
	if qs_exists:
		new_slug = "{slug}-{randstr}".format(
			slug = slug[:max_length-5], randstr = random_string_generator(size = 4))
			
		return unique_slug_generator(instance, new_slug = new_slug)
	return slug

DEFAULT_PAGE = 1
DEFAULT_PAGE_SIZE = 6

class CustomPagination(PageNumberPagination):
    page = DEFAULT_PAGE
    page_size = DEFAULT_PAGE_SIZE
    page_size_query_param = 'page_size'

    def get_paginated_response(self, data):
        return Response({
            'links': {
                'next': self.get_next_link(),
                'previous': self.get_previous_link()
            },
            'total': self.page.paginator.count,
            'page': int(self.request.GET.get('page', DEFAULT_PAGE)),
            'page_size': int(self.request.GET.get('page_size', self.page_size)),
            'results': data
        })