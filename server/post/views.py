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
        # if 'keyword' in self.request.query_params and self.request.query_params['keyword'] is not None:
        #     return queryset.filter(title__icontains=self.request.query_params['keyword']).order_by('-created_at')
        if not self.request.user.is_authenticated:
            return queryset.filter(active=True).order_by('-created_at')
        if self.request.user.is_authenticated:
            return queryset.filter(author=self.request.user).order_by('-created_at')
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

    def post(self, request, *args, **kwargs):
        post_id = request.data.get('id')
        if not post_id:
            return JsonResponse({"error": "ID is required"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            post = Post.objects.get(id=post_id)
        except Post.DoesNotExist:
            return JsonResponse({"error": "Post not found"}, status=status.HTTP_404_NOT_FOUND)

        if not request.user.is_superuser and request.user.username != post.author:
            return JsonResponse({"error": "You do not have permission to update this post"}, status=status.HTTP_403_FORBIDDEN)

        serializer = self.serializer_class(post, data=request.data)
        if serializer.is_valid():
            serializer.save()
            # Invalidate the cache for this post
            cache.set(f'post_{post_id}', post, timeout=CACHE_TTL)
            cache.delete('posts')
            return JsonResponse(serializer.data)
        return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class PostDelete(generics.DestroyAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = [IsAuthorOrAdminOrReadOnly]

    def post(self, request, *args, **kwargs):
        post_id = request.data.get('id')
        if not post_id:
            return JsonResponse({"error": "ID is required"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            post = Post.objects.get(id=post_id)
        except Post.DoesNotExist:
            return JsonResponse({"error": "Post not found"}, status=status.HTTP_404_NOT_FOUND)

        if not request.user.is_superuser and request.user.username != post.author:
            return JsonResponse({"error": "You do not have permission to delete this post"}, status=status.HTTP_403_FORBIDDEN)

        post.delete()
        cache.delete(f'post_{post_id}')
        cache.delete('posts')
        return JsonResponse({"message": "Post deleted successfully"}, status=status.HTTP_200_OK)
    
class PostChangeStatus(generics.UpdateAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = [IsAuthorOrAdminOrReadOnly]
    
    def post(self, request, *args, **kwargs):
        post_id = request.data.get('id')
        if not post_id:
            return JsonResponse({"error": "ID is required"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            post = Post.objects.get(id=post_id)
        except Post.DoesNotExist:
            return JsonResponse({"error": "Post not found"}, status=status.HTTP_404_NOT_FOUND)

        if not request.user.is_superuser and request.user.username != post.author:
            return JsonResponse({"error": "You do not have permission to change the status of this post"}, status=status.HTTP_403_FORBIDDEN)

        serializer = self.serializer_class(post)
        post = serializer.change_status(post)
        cache.set(f'post_{post_id}', post, timeout=CACHE_TTL)
        cache.delete('posts')
        return JsonResponse(serializer.data)
    
        
