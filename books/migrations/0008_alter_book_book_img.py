# Generated by Django 5.0.6 on 2024-05-23 17:38

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('books', '0007_alter_book_book_img'),
    ]

    operations = [
        migrations.AlterField(
            model_name='book',
            name='book_img',
            field=models.ImageField(upload_to='book_photos'),
        ),
    ]
