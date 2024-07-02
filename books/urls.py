from django.urls import path
from . import views



urlpatterns=[



    path('',views.add_book,name="addbook"),
    path('getbooks',views.get_book,name='getbooks'),
    path('editbook',views.edit_book,name='editbook'),
    path('admin_list',views.admin_list,name='list_books'),
    path("delbook",views.delete,name="deletebook"),
    path('borrow',views.borrow,name='borrow'),
    path('user_list',views.user_list,name='list_books_user'),
    path("getborrowed",views.get_borrowed,name='borrowed'),
    path("getadded",views.get_added,name='get_added'),
    path("return",views.return_book , name="return_book"),
    path("book_page",views.bookpage,name="bookpage"),
    path("search",views.query_search,name="search")








]