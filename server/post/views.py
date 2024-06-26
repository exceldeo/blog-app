from django.http import JsonResponse
from rest_framework import status
from post.models import Post, Comment, Like
from post.serializers import PostSerializer, CommentSerializer, LikeSerializer
from rest_framework import generics
from rest_framework import permissions
from rest_framework.permissions import AllowAny, IsAuthenticated
from post.permissions import IsAuthorOrAdminOrReadOnly
from django.forms.models import model_to_dict

from rest_framework.pagination import PageNumberPagination

from django.core.cache import cache

from server.settings import CACHE_TTL

class PostList(generics.ListCreateAPIView):
    queryset = Post.objects.using('slave').all()
    serializer_class = PostSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    pagination_class = PageNumberPagination

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)
        # Invalidate the cache for posts
        cache.delete('posts')
        cache.delete('posts', version='backup')
    
    def get_queryset(self):
        queryset = cache.get('posts')
        if not queryset:
            queryset = cache.get('posts', version='backup')
        if not queryset:
            queryset = Post.objects.using('slave').all()
            cache.set('posts', queryset, timeout=CACHE_TTL)
            cache.set('posts', queryset, timeout=CACHE_TTL, version='backup')
        if 'keyword' in self.request.query_params and self.request.query_params['keyword'] is not None:
            queryset = queryset.filter(title__icontains=self.request.query_params['keyword'])
        if 'start_date' and 'end_date' in self.request.query_params and self.request.query_params['start_date'] is not None and self.request.query_params['end_date'] is not None:
            queryset = queryset.filter(
                created_at__range=[
                    self.request.query_params['start_date'],
                    self.request.query_params['end_date']
                ]
            )
        if not self.request.user.is_authenticated:
            return queryset.filter(active=True).order_by('-created_at')
        if self.request.user.is_authenticated:
            return queryset.filter(author=self.request.user).order_by('-created_at')
        return queryset.order_by('-created_at')

class PostDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Post.objects.using('slave').all()
    serializer_class = PostSerializer
    permission_classes = [IsAuthorOrAdminOrReadOnly]
    
    def get_object(self):
        post_id = self.kwargs['pk']
        post = cache.get(f'post_{post_id}')
        if not post:
            post = cache.get(f'post_{post_id}', version='backup')
        if not post:
            post = super().get_object()
            cache.set(f'post_{post_id}', post, timeout=CACHE_TTL)
            cache.set(f'post_{post_id}', post, timeout=CACHE_TTL, version='backup')
        return post
        
class PostCreate(generics.CreateAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)
        # Invalidate the cache for posts
        cache.delete('posts')
        cache.delete('posts', version='backup')

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
            cache.set(f'post_{post_id}', post, timeout=CACHE_TTL, version='backup')
            cache.delete('posts')
            cache.delete('posts', version='backup')
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
        post.delete(using='slave')
        cache.delete(f'post_{post_id}')
        cache.delete(f'post_{post_id}', version='backup')
        cache.delete('posts')
        cache.delete('posts', version='backup')
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
        cache.set(f'post_{post_id}', post, timeout=CACHE_TTL, version='backup')
        cache.delete('posts')
        cache.delete('posts', version='backup')
        return JsonResponse(serializer.data)
    
class CommentList(generics.ListCreateAPIView):
    serializer_class = CommentSerializer
    permission_classes = (AllowAny,)

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)
        # Invalidate the cache for comments of this post
        post_id = self.request.data.get('post', None)
        if post_id is not None:
            cache.delete(f'comments_{post_id}')
            cache.delete(f'comments_{post_id}', version='backup')

    def get_queryset(self):
        post_id = self.request.query_params.get('post', None)
        print(post_id)
        if post_id is not None:
            queryset = cache.get(f'comments_{post_id}')
            if not queryset:
                queryset = cache.get(f'comments_{post_id}', version='backup')
            if not queryset:
                queryset = Comment.objects.using('slave').filter(post_id=post_id).order_by('-created_at')
                cache.set(f'comments_{post_id}', queryset, timeout=CACHE_TTL)
                cache.set(f'comments_{post_id}', queryset, timeout=CACHE_TTL, version='backup')
            return queryset
        else:
            return Comment.objects.using('slave').none()  # Return an empty queryset if no post ID is provided
    
class CommentCreate(generics.CreateAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        post_id = self.request.data.get('post', None)
        if post_id is not None:
            serializer.save(author=self.request.user, post_id=post_id)
            # Invalidate the cache for the comments of this post
            cache.delete(f'comments_{post_id}')
            cache.delete(f'comments_{post_id}', version='backup')

class LikeCreate(generics.CreateAPIView):
    queryset = Like.objects.all()
    serializer_class = LikeSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        post_id = self.request.data.get('post', None)
        if post_id is not None:
            check_like = Like.objects.filter(post_id=post_id, author=self.request.user)

            if check_like.exists():
                return JsonResponse({"error": "You have already liked this post"}, status=status.HTTP_400_BAD_REQUEST)

            serializer.save(author=self.request.user, post_id=post_id)
            # Invalidate the cache for the comments of this post
            cache.delete(f'comments_{post_id}')
            cache.delete('posts')
            cache.delete(f'post_{post_id}')
            cache.delete(f'comments_{post_id}', version='backup')
            cache.delete('posts', version='backup')
            cache.delete(f'post_{post_id}', version='backup')

class LikeDelete(generics.DestroyAPIView):
    queryset = Like.objects.all()
    serializer_class = LikeSerializer
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        post_id = request.data.get('post')
        if not post_id:
            return JsonResponse({"error": "Post ID is required"}, status=status.HTTP_400_BAD_REQUEST)
        print(post_id, request.user)
        try:
            like = Like.objects.get(post_id=post_id, author=request.user)
        except Like.DoesNotExist:
            return JsonResponse({"error": "Like not found"}, status=status.HTTP_404_NOT_FOUND)
        
        like.delete()
        like = Like.objects.using('slave').get(post_id=post_id, author=request.user)
        like.delete(using='slave')
        # Invalidate the cache for the comments of this post
        cache.delete(f'comments_{post_id}')
        cache.delete('posts')
        cache.delete(f'post_{post_id}')
        cache.delete(f'comments_{post_id}', version='backup')
        cache.delete('posts', version='backup')
        cache.delete(f'post_{post_id}', version='backup')
        return JsonResponse({"message": "Like deleted successfully"}, status=status.HTTP_200_OK)

class LikeList(generics.ListCreateAPIView):
    serializer_class = LikeSerializer
    permission_classes = (AllowAny,)

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)

    def get_queryset(self):
        post_id = self.request.query_params.get('post', None)
        if post_id is not None:
            queryset = cache.get(f'likes_{post_id}')
            if not queryset:
                queryset = cache.get(f'likes_{post_id}', version='backup')
            if not queryset:
                queryset = Like.objects.using('slave').filter(post_id=post_id).order_by('-created_at')
                cache.set(f'likes_{post_id}', queryset, timeout=CACHE_TTL)
                cache.set(f'likes_{post_id}', queryset, timeout=CACHE_TTL, version='backup')
            return queryset
        else:
            return Like.objects.using('slave').none()  # Return an empty queryset if no post ID is provided

class CheckDataCache(generics.ListCreateAPIView):
    def get(self, request, *args, **kwargs):
        data = cache.get('posts')
        if not data:
            data = cache.get('posts', version='backup')
        
        # Convert QuerySet to list of dictionaries
        data = [model_to_dict(item) for item in data]
        
        return JsonResponse({"data": data}, status=status.HTTP_200_OK)