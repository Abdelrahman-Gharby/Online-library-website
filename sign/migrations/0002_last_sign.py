# Generated by Django 5.0.6 on 2024-05-23 07:36

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('sign', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='last_sign',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=20)),
                ('password', models.CharField(max_length=20)),
                ('is_admin', models.BooleanField(default=False)),
            ],
        ),
    ]