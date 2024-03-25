from rest_framework import serializers
from .models import Post

class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ('id', 'title', 'content', 'active', 'created_at', 'updated_at', 'author')
        read_only_fields = ('author',)
    
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
    


    

    
