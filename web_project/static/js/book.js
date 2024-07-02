

class book{

    constructor(id,name,author,category,image,descrption,status){
  
      this.id=id;
      this.name=name;
      this.author=author;
      this.category=category;
      this.book_img=image
      this.descrption=descrption;
      this.borrowed=status
      
  
    }
  }


  const csrfToken = document.querySelector("[name=csrfmiddlewaretoken]").value;
var is_admin=false;
var this_book=[]


async function get_last(){


    try{
  
       
        var response= await fetch("/sign/getlast")
  
        var message= await response.json();
  
        console.log(message)
  
    
        
  
          for(var key in message.last){
  
       
            is_admin=message.last[key].is_admin;
        
    
          }
  
         
        
  
    }
  
    catch(err){
  
        console.log(err)
    }
  
  
  
  }


async function get_pressed(){

    
    try{


        console.log(csrfToken)
    
  
       
        var response= await fetch("/book/book_page",{

            method:"POST",
            body:JSON.stringify({'book_id':sessionStorage.getItem('pressed_id')}),
            headers:{
                "content-type":'application/json',
                'X-CSRFToken': csrfToken,
               
            }


        })
  
        var message= await response.json();

       

        

        document.title=message.book[0].title;
        document.getElementById("fav").setAttribute("href",`/book_photos/${message.book[0].book_img}`)


        this_book.push(new book(message.book[0].book_id,message.book[0].title,
                        message.book[0].book_author,message.book[0].book_category,message.book[0].book_img,
                        message.book[0]. book_descrption,message.book[0].is_borrowed));
  
                        console.log(this_book)
        
  
    
        
  
          
  
         
        
  
    }
  
    catch(err){
  
        console.log(err)
    }



}  
  

function display(){

    
    for(var i=0 ; i<this_book.length ; ++i){





        if(is_admin==true){

               document.getElementById("container").innerHTML=`
            <nav class="nav-bar">
            <div class="nav-left">
                <h1><a href="admin_index.html">Bibleoticha<span>.</span></a></h1>
            </div>
            <div class="nav-center">
                <ul>
                <li class="homee"><a href="/index_admin" class="home">Home</a></li>             
                <li><a href="/book/">Add Book</a></li>
                <li><a href="/book/admin_list">view list of books</a></li>
                <li><a href="/profile">Profile</a></li>
                <li class="log-out">
              
    
    
    
    <button type="submit"  id="log_out">log out</button>
    
    
    </li>
            
                </ul>
            </div>
            <div class="nav-right">
               <a href="contact us.html"> <i class="fa-solid fa-phone"></i></a>
            </div>
        </nav>
    
    
    
    
    
        <div class="book-container">
    
            
            <div class="book-info">
         <p><span class="bo">Book Id : </span> ${this_book[i].id}</p>
            <p> <span class="bo">Book Name : </span> ${this_book[i].name}</p>
            <p> <span class="bo">Book Authour : </span> ${this_book[i].author}</p>
            <p> <span class="bo">Book category : </span> ${this_book[i].category}</p>
                <h3 class="bo">Book description:</h3>
                
                
                <p >${this_book[i].descrption}</p>
                    
                    
                </div>
                <div class="book-img">
        
                    <img src="/book_photos/${this_book[i].book_img}">
        
        
                </div>
            </div>
            
    
        
    
        <footer  class="fs">
            <div class="container5">
                <div class="about">
                    <div class="in-about">
                        <img src="/static/imgs/bookicon3jpg.jpg" style="border-radius: 50%;" alt="">
                        <h2>Bibleoticha<span>.</span></h2>
                    </div>
                    <p>Bibleoticha is an online library made to make you comfortable while reading books</p>
                    <h3>Social Media</h3>
                    <ul class="social-icons">
                        <li><a href=""><i class="fa-brands fa-twitter"></i></a></li>
                        <li><a href=""><i class="fa-brands fa-facebook"></i></a></li>
                        <li><a href=""><i class="fa-brands fa-instagram"></i></a></li>
                        <li><a href=""><i class="fa-brands fa-whatsapp"></i></a></li>
                    </ul>
                </div>
               
                <div class="footer-detail">
                    <h3>Get in Touch</h3>
                    <ul>
                        <li>
                            <i class="fa-solid fa-location-dot"></i>
                            <span>Ahmed Zewail Street - Giza - Egypt</span>
                        </li>
          
                        <li>
                            <i class="fa-solid fa-envelope"></i>
                            <a href="">bibleoticha@gmail.com</a>
                        </li>
          
                        <li>
                            <i class="fa-solid fa-phone"></i>
                            <a href="">+01011121314</a>
                        </li>
                    </ul>
                </div>
            </div>
          </footer> 
    
            
            `


        }


        else{


            document.getElementById("container").innerHTML=`
            <nav class="nav-bar">
            <div class="nav-left">
                <h1><a href="admin_index.html">Bibleoticha<span>.</span></a></h1>
            </div>
            <div class="nav-center">
                <ul>
                <li class="homee"><a href="/index_user" class="home">Home</a></li>
                <li><a href="/book/user_list">View List Of Books</a></li>
                <li><a href="/profile">Profile</a></li>
               <li class="log-out">
    
    
    
    <button type="submit"  id="log_out">log out</button>
    
    
    </li>

                </ul>
            </div>
            <div class="nav-right">
               <a href="contact us.html"> <i class="fa-solid fa-phone"></i></a>
            </div>
        </nav>
    
    
    
    
        <div class="book-container">
    
            
        <div class="book-info">
            
            
            <p><span class="bo">Book Id : </span> ${this_book[i].id}</p>
            <p> <span class="bo">Book Name : </span> ${this_book[i].name}</p>
            <p> <span class="bo">Book Authour : </span> ${this_book[i].author}</p>
            <p> <span class="bo">Book category : </span> ${this_book[i].category}</p>
            
             <h3 class="bo">Book description : </h3>
            
            
            <p >${this_book[i].descrption}</p>
                
                
            </div>
            <div class="book-img">
    
                <img src="/book_photos/${this_book[i].book_img}">
    
    
            </div>
        </div>
            
    
        
    
        <footer  class="">
            <div class="container5">
                <div class="about">
                    <div class="in-about">
                        <img src="/static/imgs/bookicon3jpg.jpg" style="border-radius: 50%;" alt="">
                        <h2>Bibleoticha<span>.</span></h2>
                    </div>
                    <p>Bibleoticha is an online library made to make you comfortable while reading books</p>
                    <h3>Social Media</h3>
                    <ul class="social-icons">
                        <li><a href=""><i class="fa-brands fa-twitter"></i></a></li>
                        <li><a href=""><i class="fa-brands fa-facebook"></i></a></li>
                        <li><a href=""><i class="fa-brands fa-instagram"></i></a></li>
                        <li><a href=""><i class="fa-brands fa-whatsapp"></i></a></li>
                    </ul>
                </div>
               
                <div class="footer-detail">
                    <h3>Get in Touch</h3>
                    <ul>
                        <li>
                            <i class="fa-solid fa-location-dot"></i>
                            <span>Ahmed Zewail Street - Giza - Egypt</span>
                        </li>
          
                        <li>
                            <i class="fa-solid fa-envelope"></i>
                            <a href="">bibleoticha@gmail.com</a>
                        </li>
          
                        <li>
                            <i class="fa-solid fa-phone"></i>
                            <a href="">+01011121314</a>
                        </li>
                    </ul>
                </div>
            </div>
          </footer> 
    
            
            `



        }



    
}

}


function press_logout(){


    let bt=document.getElementById("log_out")
  
  
    bt.onclick=function(){
  
  
      request_log_out();
  
  
    }
 }
  
  async function request_log_out(){
  
  
    var response= await fetch("/",{
  
      method:"DELETE",
  
      headers:{
  
        'X-CSRFToken': csrfToken,
      }
    })
  
  
    var message= await response.json();
  
  
    if(message.message=="succes"){
  
      window.location.href="/"
    }
  
  
  
  }
async function main(){


    await get_last();
    await get_pressed();
    display();
    press_logout();

}

main();






  
