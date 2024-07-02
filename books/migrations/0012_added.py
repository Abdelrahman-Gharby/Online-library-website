# Generated by Django 5.0.6 on 2024-05-25 01:12

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('books', '0011_borrowed'),
    ]

    operations = [
        migrations.CreateModel(
            name='added',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('book_id', models.CharField(default=' ', max_length=6)),
                ('title', models.CharField(default='', max_length=30)),
                ('book_author', models.CharField(default='', max_length=30)),
                ('book_category', models.CharField(default='', max_length=20)),
                ('name', models.CharField(default='', max_length=20)),
                ('password', models.CharField(default='', max_length=20)),
            ],
        ),
    ]