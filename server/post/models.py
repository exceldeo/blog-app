from django.db import models

class CharField(models.CharField):
    def __init__(self, *args, **kwargs):
        kwargs.setdefault('max_length', 65000)
        super(CharField, self).__init__(*args, **kwargs)

    def db_type(self, connection):
        return 'text'

    def south_field_triple(self):
        """Only necessary if using South migrations, which you should."""
        from south.modelsinspector import introspector
        field_class = self.__class__.__module__ + "." + self.__class__.__name__
        args, kwargs = introspector(self)
        return (field_class, args, kwargs)

# Create your models here.
class Post(models.Model):
    title = models.CharField(max_length=100, db_index=True)
    content = CharField()
    active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    author = models.CharField(max_length=100)

    def __str__(self):
        return self.title

# i want to make class comment, but i don't know how to make it i dont want make with ForeignKey
class Comment(models.Model):
    post_id = models.IntegerField(null=True)
    content = CharField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    author = models.CharField(max_length=100)

    def __str__(self):
        return self.content
    
class Like(models.Model):
    post_id = models.IntegerField(null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    author = models.CharField(max_length=100)

    def __str__(self):
        post_title = Post.objects.filter(id=self.post_id).first().title if Post.objects.filter(id=self.post_id).exists() else "Post Deleted"
        return post_title

