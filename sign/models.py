from django.db import models


class Users(models.Model):
    name=models.CharField(max_length=20)
    password=models.CharField(max_length=20)
    email=models.CharField(max_length=30)
    is_admin=models.BooleanField(default=False)



class last_sign(models.Model):
        name=models.CharField(max_length=20)
        password=models.CharField(max_length=20)
        is_admin=models.BooleanField(default=False)
    

    
