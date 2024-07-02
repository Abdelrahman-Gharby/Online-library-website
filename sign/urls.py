from django.urls import path
from . import views


urlpatterns=[

    path('', views.main_sign_up, name='sign_up'),
    path('signin',views.sign_in , name='sign_in'),
    path("signin/get_users",views.get_users,name='get_users'),
    path('getlast',views.get_last_sign,name='getlast'),
    path("delete-account",views.delete_account,name="delete-account")



]