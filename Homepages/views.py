from django.shortcuts import render
from django.http import HttpResponse,JsonResponse
from sign.models import last_sign

from django.http import JsonResponse
# Create your views here.


def index(request):
    

     if request.method=="DELETE":
         last_sign.objects.all().delete()
       
         return JsonResponse({"message":"succes"})

         

     return render(request ,'pages/index.html')



def user_index(request):
     return render(request ,'pages/index_user.html')


def admin_index(request):
      return render(request ,'pages/index_admin.html')
     


def contact_us(request):
     return render (request,'pages/contact_us.html')
     

def profile(request):
     return render(request, 'pages/profile.html')


