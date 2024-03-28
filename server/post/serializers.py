from rest_framework import serializers
from .models import Post, Comment
from rest_framework.response import Response
from rest_framework import status

class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ('id', 'title', 'content', 'active', 'created_at', 'updated_at', 'author')
        read_only_fields = ('author',)
        ordering = ['-created_at']
    
    def create(self, validated_data):
        return Post.objects.create(**validated_data)
    
    def update(self, instance, validated_data):
        instance.title = validated_data.get('title', instance.title)
        instance.content = validated_data.get('content', instance.content)
        instance.active = validated_data.get('active', instance.active)
        instance.save()
        return instance
    
    def destroy(self, instance):
        instance.delete()
        return instance
    
    def change_status(self, instance):
        instance.active = not instance.active
        instance.save()
        return instance
    
    def find_by_id_and_author(self, id, author):
        try:
            post = Post.objects.get(id=id, author=author)
            return post
        except Post.DoesNotExist:
            return Response({"error": "Post not found"}, status=status.HTTP_404_NOT_FOUND)
        
class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ('id', 'post', 'content', 'created_at', 'updated_at', 'author')
        read_only_fields = ('author',)
        ordering = ['-created_at']
    
    def create(self, validated_data):
        return Comment.objects.create(**validated_data)
    
    def update(self, instance, validated_data):
        instance.content = validated_data.get('content', instance.content)
        instance.save()
        return instance
    
    def destroy(self, instance):
        instance.delete()
        return instance
    
    def find_by_id_and_author(self, id, author):
        try:
            comment = Comment.objects.get(id=id, author=author)
            return comment
        except Comment.DoesNotExist:
            return Response({"error": "Comment not found"}, status=status.HTTP_404_NOT_FOUND)
    

    
