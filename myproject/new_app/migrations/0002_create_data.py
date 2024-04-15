from django.db import migrations

def create_data(apps, schema_editor):
    TestModel = apps.get_model('new_app', 'TestModel')
    TestModel.objects.create(tag='tag1', text_field1='text'*5, text_field2='text'*5)

class Migration(migrations.Migration):

    dependencies = [
        ('new_app', '0001_initial'),
    ]

    operations = [
        migrations.RunPython(create_data),
    ]