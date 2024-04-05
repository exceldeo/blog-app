import os
import django
from django.db import models
import redis

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'server.settings')
django.setup()

from django.contrib.auth.models import User

active_users = User.objects.filter(is_active=True).count()
print(f'Active users: {active_users}')

r = redis.Redis()
r.set('active_users', active_users)
