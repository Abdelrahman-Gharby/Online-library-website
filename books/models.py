from django.db import models
from sign.models import Users

# Create your models here.



class book(models.Model):

    book_id=models.CharField(max_length=6)
    title=models.CharField(max_length=30)
    book_author=models.CharField(max_length=30)
    book_category=models.CharField(max_length=20)
    book_img=models.ImageField(upload_to='book_photos')
    book_descrption=models.CharField(max_length=200 , default="book is good")
    is_borrowed=models.BooleanField(default=False)



class borrowed(models.Model):
      book_id=models.CharField(max_length=6,default=' ')
      title=models.CharField(max_length=30,default='')
      book_author=models.CharField(max_length=30,default='')
      book_category=models.CharField(max_length=20,default='')
      name=models.CharField(max_length=20,default='')
      password=models.CharField(max_length=20,default='')
   

   
class added(models.Model):
      book_id=models.CharField(max_length=6,default=' ')
      title=models.CharField(max_length=30,default='')
      book_author=models.CharField(max_length=30,default='')
      book_category=models.CharField(max_length=20,default='')
      name=models.CharField(max_length=20,default='')
      password=models.CharField(max_length=20,default='')



     