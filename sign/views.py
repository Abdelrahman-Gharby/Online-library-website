from django.shortcuts import render, redirect
from django.http import *
from books.models import *
from .models import Users , last_sign
import json




def main_sign_up(request):

     if request.method=="POST":

          body_unicode = request.body.decode('utf-8')
          body =json.loads(body_unicode)
          
          username=body["UserName"]
          password=body["password"]
          email=body["email"]
          is_admin=body["is_admin"]


          if(Users.objects.filter(name=username).count()!=0):
             return JsonResponse({"message":"username exists","name":password,"count":Users.objects.filter(name=username).count()})
          

          else:



               is_ad=False




               if(is_admin=="true"):
                    is_ad=True
               
               


               new_user=Users.objects.create(name=username,password=password,email=email,is_admin=is_ad)
               new_user.save()

               last_sign.objects.all().delete()
               last_in=last_sign.objects.create(name=username,password=password , is_admin=is_ad)
               last_in.save()


               if is_ad:
                   return JsonResponse({"message":"is_admin"})
               else:
                    return JsonResponse({"message":"notadmin"})
               
       
     return render(request ,"pages/sign up.html")         
        
        




def get_users(request):


        
          users=Users.objects.all()
          return JsonResponse({"message":"ok","users":list(users.values())})

            
          

def get_last_sign(request):

     last=last_sign.objects.all()
     return JsonResponse({"last":list(last.values())})




def sign_in(request):


    if request.method=="POST":
         
         body_unicode = request.body.decode('utf-8')
         body =json.loads(body_unicode)
        
        
         username=body["UserName"]
         password=body["password"]
         



         if(Users.objects.filter(name=username , password=password).count()==0):
             return JsonResponse({"message":"wrong password or user name","name":password,"count":Users.objects.filter(name=username).count()})
        


         else:
             
               x=False


               my_user=(Users.objects.filter(name=username , password=password).values())

               for data in my_user:
                     x=data['is_admin']  

     




               last_sign.objects.all().delete()
               last_in=last_sign.objects.create(name=username,password=password , is_admin=x)
               last_in.save()




               if x:
                    return JsonResponse({"message":"is_admin"})
               
               else:                 
                    return JsonResponse({"message":"not_admin"})

       
       


  
      
     
        




    return render(request,"pages/sign in.html")



           
def delete_account(request):

     if request.method=="DELETE":

         body_unicode = request.body.decode('utf-8')
         body =json.loads(body_unicode)
        
        
         username=body["name"]
         password=body["password"]
         is_admin=body["status"]


         if(Users.objects.filter(name=username , password=password).count==0):
              return JsonResponse({"message":"user does not exits"})
         
         else:
              
              if  is_admin==False:
                    books_borrowed=(borrowed.objects.filter(name=username,password=password).values())
                    books_borrowed_self=borrowed.objects.filter(name=username,password=password)
                    book_ids=[]

                    for x in books_borrowed:
                         book_ids.append(x["book_id"])

                    books_borrowed_self.delete()    


                    for i in range(0,len(book_ids)):
                         this_book=book.objects.get(book_id=book_ids[i])
                         this_book.is_borrowed=False
                         this_book.save()

              else:
                   books_added=added.objects.filter(name=username,password=password)
                   books_added.delete()
                            
                       
              

              
              

              this_user=Users.objects.get(name=username,password=password)
              this_user.delete()
              return JsonResponse({"message":"Account Deleted Succesfully"})
