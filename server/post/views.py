from django.http import JsonResponse
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from post.models import Post
from post.serializers import PostSerializer
from rest_framework import generics
from rest_framework import permissions
from rest_framework.exceptions import PermissionDenied
from post.permissions import IsAuthorOrAdminOrReadOnly

from rest_framework.pagination import PageNumberPagination

from django.core.cache import cache

from server.settings import CACHE_TTL

class PostList(generics.ListCreateAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    pagination_class = PageNumberPagination

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)
    
    def get_queryset(self):
        queryset = cache.get('posts')
        if not queryset:
            queryset = Post.objects.all()
            cache.set('posts', queryset, timeout=CACHE_TTL)
        if 'keyword' in self.request.query_params and self.request.query_params['keyword'] is not None:
            return queryset.filter(title__icontains=self.request.query_params['keyword']).order_by('-created_at')
        if not self.request.user.is_authenticated or self.request.user.is_superuser:
            return queryset.filter(active=True).order_by('-created_at')
        return queryset.order_by('-created_at')

class PostDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = [IsAuthorOrAdminOrReadOnly]
    
    def get_object(self):
        post_id = self.kwargs['pk']
        post = cache.get(f'post_{post_id}')
        if not post:
            post = super().get_object()
            cache.set(f'post_{post_id}', post, timeout=CACHE_TTL)
        return post
        
class PostCreate(generics.CreateAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)

class PostUpdate(generics.UpdateAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = [IsAuthorOrAdminOrReadOnly]

    def perform_update(self, serializer):
        serializer.save()
        

class PostDelete(generics.DestroyAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = [IsAuthorOrAdminOrReadOnly]

    def perform_destroy(self, instance):
        instance.delete()
    
class PostChangeStatus(generics.UpdateAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = [IsAuthorOrAdminOrReadOnly]
    
    def perform_update(self, serializer):
        serializer.save(active=not serializer.instance.active)

    
        
