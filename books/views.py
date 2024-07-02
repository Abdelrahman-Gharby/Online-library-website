from django.shortcuts import render,redirect
from .models import book,borrowed,added
from sign.models import last_sign
from django.http import *
import json
from django .db.models import Q

# Create your views here.


def add_book(request):



    if request.method=="POST":
          
          body_unicode = request.body.decode('utf-8')
          body =json.loads(body_unicode)
          
          book_id=body['book_id']
          book_title=body['book_name']
          book_author=body['author']
          book_category=body["category"]
          book_img=body["image"]
          book_descrption=body['descreption']


          book_img="/book_photos/"+book_img



          if(book.objects.filter(book_id=book_id).count()!=0):
                 return JsonResponse({"message":"registerd id"})
          

          else:
              new_book=book.objects.create(book_id=book_id,title=book_title,book_author=book_author,book_category=book_category,book_img=book_img ,
                                       book_descrption=book_descrption)
          
              this_user=last_sign.objects.all()
              name=""
              password=" "

              for i in this_user:
                  name=i.name
                  password=i.password
                 

          
              newadded=added.objects.create(book_id=book_id,title=book_title,book_author=book_author,book_category=book_category,
                                        name=name, password=password)
          
              newadded.save()
          

              new_book.save()


       
           
          
              return JsonResponse({"message":"succes"})


  
       


         
          
          


     
     
               

# return redirect('/index_admin')
     


       

    return render(request,'pages/add_book.html')



def edit_book(request):
          
          if request.method=="PUT":
                
                body_unicode = request.body.decode('utf-8')
                body =json.loads(body_unicode)

                old_book_id=body['old_book_id']
                book_id=body['book_id']
                book_title=body['book_name']
                book_author=body['author']
                book_category=body["category"]
                book_descrption=body['descreption']



                if(book.objects.filter(book_id=book_id).count()!=0 and book_id!=old_book_id):
                         return JsonResponse({"message":"registerd id"})
          
                       
                
              
                else:
                       
                     this_book=book.objects.get(book_id=old_book_id)
                     this_book.book_id=book_id
                     this_book.title=book_title
                     this_book.book_author=book_author
                     this_book.book_category=book_category
                     this_book.book_descrption=book_descrption

                     
                     if(borrowed.objects.filter(book_id=old_book_id).count()!=0):
                            this_borrowed=borrowed.objects.get(book_id=old_book_id)
                            this_borrowed.book_id=book_id
                            this_borrowed.title==book_title
                            this_borrowed.book_author=book_author
                            this_borrowed.book_category=book_category
                            this_borrowed.save() 


                     this_added=added.objects.get(book_id=old_book_id)
                     this_added.book_id=book_id
                     this_added.title=book_title
                     this_added.book_author=book_author
                     this_added.book_category=book_category

                     this_added.save()
                     

                     


                     this_book.save()
                     return JsonResponse({"message":"succes"})

              
          

          return render(request , 'pages/edit_book.html')

     

def get_book(request):
     books=book.objects.all()
     return JsonResponse({"message":"ok","books":list(books.values())})



def admin_list(request):
     return render(request ,'pages/list_books.html')


def user_list(request):
         return render(request ,'pages/list_books_user.html')
       

def delete(request):
           
           if request.method=="DELETE":
                body_unicode = request.body.decode('utf-8')
                body =json.loads(body_unicode)
                book_id=body['book_id']

                this_book=book.objects.get(book_id=book_id)
                this_added=added.objects.get(book_id=book_id)

                if(this_book.is_borrowed==True):
                       return JsonResponse({"message":"can not delete"})
                
                else:
                     this_book.delete()
                     this_added.delete()
                     return JsonResponse({"message":"succes"})

              

           return JsonResponse( {"message":"error"})



def get_borrowed(request):
        
        if request.method=="POST":
                body_unicode = request.body.decode('utf-8')
                body =json.loads(body_unicode)
                name=body['name']
                password=body["password"]
               
               

                books=borrowed.objects.filter(name=name,password=password)
                return JsonResponse({"books":list(books.values())})
        



def get_added(request):

         if request.method=="POST":
                body_unicode = request.body.decode('utf-8')
                body =json.loads(body_unicode)
                name=body['name']
                password=body["password"]
               
               

                books=added.objects.filter(name=name,password=password)
                return JsonResponse({"books":list(books.values())})





def borrow(request):
         
         if request.method=="PUT":
              body_unicode = request.body.decode('utf-8')
              body =json.loads(body_unicode)
              
              book_i=body['book_id']
              book_title=body['book_name']
              book_author=body['author']
              book_category=body["category"]
              username=body["UserName"]
              password=body["password"]       
         
              this_book=book.objects.get(book_id=book_i)

         
              if(this_book.is_borrowed==True):
                       return JsonResponse({"message":"borrowed"})
              

              else:
                     this_book.is_borrowed=True
                     this_book.save()

                     borrowed_book=borrowed.objects.create(book_id=book_i,title=book_title,book_author=book_author,book_category=book_category,
                                      name=username,password=password)
         
                     borrowed_book.save()

                     return JsonResponse({"message":"succes"})

        
          
         return JsonResponse( {"res":"good"})
        


def return_book(request):

       if request.method=="DELETE":
              body_unicode = request.body.decode('utf-8')
              body =json.loads(body_unicode)
              book_id=body['book_id']

              this_borrowed=borrowed.objects.get(book_id=book_id)
              this_book=book.objects.get(book_id=book_id)
              this_book.is_borrowed=False
              this_book.save()
              this_borrowed.delete()

              return JsonResponse({"message":"succes"})
       


def bookpage(request):

       if request.method=="POST":
              body_unicode = request.body.decode('utf-8')
              body =json.loads(body_unicode)
              book_id=body['book_id']


              this_book=book.objects.filter(book_id=book_id)


              return JsonResponse({"book":list(this_book.values())})


            

              

          

             

       return render(request, 'pages/book.html')
           

def query_search(request):
           if request.method=="POST":
              body_unicode = request.body.decode('utf-8')
              body =json.loads(body_unicode)
              key=body["key"]
              value=body["value"]



              if(key=="All"):
                     this_book=book.objects.filter( Q(title__contains=value) | Q(book_author__contains=value) | Q(book_category__contains=value))
                     return JsonResponse({"book":list(this_book.values())})


              else:
                     books=book.objects.filter(key__contains=value);

                     return JsonResponse({"book":key})

                     












       
  


