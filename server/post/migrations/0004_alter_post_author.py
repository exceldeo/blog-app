# Generated by Django 4.0.10 on 2024-03-25 06:49

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('post', '0003_rename_user_post_author'),
    ]

    operations = [
        migrations.AlterField(
            model_name='post',
            name='author',
            field=models.CharField(max_length=100),
        ),
    ]
