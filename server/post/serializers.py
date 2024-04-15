from rest_framework import serializers
from .models import Post, Comment, Like
from rest_framework.response import Response
from rest_framework import status

        
class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = '__all__'
        read_only_fields = ('author',)
        ordering = ['-created_at']
    
    def create(self, validated_data):
        comment = Comment.objects.create(**validated_data)
        Comment.objects.using('slave').create(**validated_data)
        return comment
    
    def update(self, instance, validated_data):
        instance.content = validated_data.get('content', instance.content)
        instance.save()
        instance.save(using='slave')
        return instance
    
    def destroy(self, instance):
        instance.delete()
        instance.delete(using='slave')
        return instance
    
    def find_by_id_and_author(self, id, author):
        try:
            comment = Comment.objects.using('slave').get(id=id, author=author)
            return comment
        except Comment.DoesNotExist:
            return Response({"error": "Comment not found"}, status=status.HTTP_404_NOT_FOUND)
        
    def find_by_post(self, post):
        try:
            comment = Comment.objects.using('slave').get(post=post)
            return comment
        except Comment.DoesNotExist:
            return Response({"error": "Comment not found"}, status=status.HTTP_404_NOT_FOUND)
    
class LikeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Like
        fields = '__all__'
        read_only_fields = ('author',)
        ordering = ['-created_at']
    
    def create(self, validated_data):
        like = Like.objects.create(**validated_data)
        Like.objects.using('slave').create(**validated_data)
        return like
    
    def destroy(self, instance):
        instance.delete()
        instance.delete(using='slave')
        return instance
    
    def find_by_id_and_author(self, id, author):
        try:
            like = Like.objects.using('slave').get(id=id, author=author)
            return like
        except Like.DoesNotExist:
            return Response({"error": "Like not found"}, status=status.HTTP_404_NOT_FOUND)
    
    def find_by_post_and_author(self, post, author):
        try:
            like = Like.objects.using('slave').get(post=post, author=author)
            return like
        except Like.DoesNotExist:
            return Response({"error": "Like not found"}, status=status.HTTP_404_NOT_FOUND)
        
    def find_by_post(self, post):
        try:
            like = Like.objects.using('slave').get(post=post)
            return like
        except Like.DoesNotExist:
            return Response({"error": "Like not found"}, status=status.HTTP_404_NOT_FOUND)
        
class PostSerializer(serializers.ModelSerializer):
    likes = serializers.SerializerMethodField()
    comments_count = serializers.SerializerMethodField()

    class Meta:
        model = Post
        fields = ('id', 'title', 'content', 'active', 'created_at', 'updated_at', 'author','comments_count','likes')
        read_only_fields = ('author', 'created_at', 'updated_at', 'comments', 'likes')
        ordering = ['-created_at']
    
    def create(self, validated_data):
        post = Post.objects.create(**validated_data)
        Post.objects.using('slave').create(**validated_data)
        return post
    
    def update(self, instance, validated_data):
        instance.title = validated_data.get('title', instance.title)
        instance.content = validated_data.get('content', instance.content)
        instance.active = validated_data.get('active', instance.active)
        instance.save()
        instance.save(using='slave')
        return instance
    
    def destroy(self, instance):
        instance.delete()
        instance.delete(using='slave')
        return instance
    
    def change_status(self, instance):
        instance.active = not instance.active
        instance.save()
        instance.save(using='slave')
        return instance
    
    def find_by_id_and_author(self, id, author):
        try:
            post = Post.objects.using('slave').get(id=id, author=author)
            return post
        except Post.DoesNotExist:
            return Response({"error": "Post not found"}, status=status.HTTP_404_NOT_FOUND)
        
    def get_likes(self, obj):
        likes = Like.objects.using('slave').filter(post_id=obj.id)
        return LikeSerializer(likes, many=True).data
    
    def get_comments_count(self, obj):
        comments = Comment.objects.using('slave').filter(post_id=obj.id)   
        return comments.count()
    
    def filter_by_date_range(self, start_date, end_date):
        return Post.objects.using('slave').filter(created_at__range=[start_date, end_date])
