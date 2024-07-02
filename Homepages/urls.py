from django.urls import path
from . import views

urlpatterns=[

    path('',views.index,name="index"),
    path('index_user',views.user_index,name="user_index"),
    path('index_admin',views.admin_index,name="user_admin"),
    path('contactus',views.contact_us,name='contactus'),
    path('profile',views.profile,name='profile')



  
    
]