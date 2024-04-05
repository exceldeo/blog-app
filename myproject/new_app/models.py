from django.db import models

# Create your models here.
from django.db import models

class TestModel(models.Model):
    tag = models.CharField(max_length=10)
    text_field1 = models.TextField()
    text_field2 = models.CharField(max_length=10)