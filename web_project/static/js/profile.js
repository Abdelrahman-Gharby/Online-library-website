
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

  class added{

    constructor(i,a,b,c,d,e){
  
        this.id=i;
        this.bookname=a;
        this.author=b;
        this.category=c;
        this.adder_username=d;
        this.pass=e;
    }
  }
  

  class borrowed{

    constructor(i,a,b,c,d,e){

        this.id=i;
        this.bookname=a;
        this.author=b;
        this.category=c;
        this.owner_username=d;
        this.pass=e;
    }
}


const csrfToken_self=document.querySelector("[name=csrfmiddlewaretoken]")
const csrfToken = document.querySelector("[name=csrfmiddlewaretoken]").value;
var is_admin=false;
var last_name="";
var last_password="";


var added_books=[]
var borrowed_books=[];
var my_books=[]
var c=0;
var div_books=[]
var my_books=[]


async function get_books(){


  try{

     
      var response= await fetch("/book/getbooks")

      var message= await response.json();

      console.log(message)

      if(message.message=="ok" ){
      


        my_books=[];
        

          
      for(var key in message.books){
       
          
        my_books.push(new book(message.books[key].book_id,message.books[key].title,
          message.books[key].book_author,message.books[key].book_category,message.books[key].book_img,
          message.books[key]. book_descrption,message.books[key].is_borrowed));
      }

      console.log(my_books)


      }

  }

  catch(err){

      console.log(err)
  }



}

async function get_last(){


  try{

     
      var response= await fetch("/sign/getlast")

      var message= await response.json();

      console.log(message)

  
      

        for(var key in message.last){

     
          is_admin=message.last[key].is_admin;
          console.log(is_admin)
          last_name=message.last[key].name;
          last_password=message.last[key].password;
  
        }

       
      

  }

  catch(err){

      console.log(err)
  }



}


async function get_borrowed(){



  try{

   
    console.log(csrfToken)
    let response= await fetch("/book/getborrowed",{
    
        method:"POST",
        body:JSON.stringify({
          'name':last_name,
          'password':last_password}),
    
        headers:{
          'Content-Type': 'application/json',
          'X-CSRFToken': csrfToken,
        }
      })

      let message= await response.json();


      console.log(message)

      
      for(var key in message.books){
  
       
         
        borrowed_books.push(new borrowed(message.books[key].book_id,message.books[key].title,
            message.books[key].book_author,message.books[key].book_category,message.books[key].name,message.books[key].password));

    }


    }


    catch(err){


    }

}



async function get_added(){


  
  try{

   
  
    let response= await fetch("/book/getadded",{
    
        method:"POST",
        body:JSON.stringify({
          'name':last_name,
          'password':last_password}),
    
        headers:{
          'Content-Type': 'application/json',
          'X-CSRFToken': csrfToken,
        }
      })

      let message= await response.json();


      console.log(message)

      
      for(var key in message.books){
  
       
         
        added_books.push(new added(message.books[key].book_id,message.books[key].title,
            message.books[key].book_author,message.books[key].book_category,message.books[key].name,message.books[key].password));

    }


    }


    catch(err){


    }

}



function display(){
  
  console.log("ooooo")
  
  console.log(my_books)
  let user_type=""
  
  console.log(is_admin)
  
  if(is_admin==true){
    
    user_type="admin"
  }
  
  else{
    user_type="user" 
  }
  
  console.log(user_type)
  
  
  let books_type="";
  
  
  if(is_admin==true){
    
    books_type="added books"
  }
  
  else{
    
    books_type="borrowed books"
  }
  
  console.log(books_type)
  
  
  
  if(is_admin==true){
    
    
    
    document.getElementById("container").innerHTML=`
    
    
    <nav class="nav-bar">
    <div class="nav-left">
    <h1><a href="/user_admin">Bibleoticha<span>.</span></a></h1>
    </div>
    <div class="nav-center">
    <ul>
    <li class="homee"><a href="/index_admin" class="home">Home</a></li>
    <li><a href="/book/">Add Book</a></li>
    <li><a href="/book/admin_list">view list of books</a></li>
    
    
    <li class="log-out">
    
    
    
    <button type="submit"  id="log_out">log out</button>
    
    
    </li>
    </ul>
    </div>
    <div class="nav-right">
    <a href="contact us.html"> <i class="fa-solid fa-phone"></i></a>
    </div>
  </nav>
  
  
  
  
  
  <div class="about-profile">
  
  
  
   
   
      <div class="big">

        <div class="info">
      
            <h4>Profile Status</h4>
        
           <p><span>User Name:</span> ${last_name}</p> 
           
           <p><span>User Type:</span>${user_type}</p>
      
           
           
           
           
           </div>

           <div class="del-acc">

            <button class="bt-del">Delete Account</button>

              <p id="del-err"></p>

           </div>
    </div>
    

  
  
  
  
      <div class="left">
  
          <div class="inside-left">
  
              <div class="img-inside-left">
  
  
                  <div class="icons-img-inside-left">
                      <i class="fa-brands fa-facebook"></i>
                      <i class="fa-brands fa-twitter"></i>
                      <i class="fa-brands fa-google"></i>
                      <i class="fa-brands fa-github"></i>
  
                  </div>
  
              </div>
  
  
      </div>
  
  
  
  
  
  </div>
  
  </div> 
  
  
  
  
  <h2 class="book-title">${books_type}</h2>
  
  <main class="main1">
  
  
  <div class="slider" id="slider">
  
  
  
  
  
  
    
    <div class="arrow">
      
            
    <button class="left_button" > &lt </button>
    <button class="right_button"  > &gt </button>
    </div>
  
    </div>
  
  
    
  
  
    </main>
  
  
  
  
  
    
  
  
    <footer class="fs" style="background: url( 'static/imgs/textured-metal-background.jpg' )">
    <div class="container5">
        <div class="about">
            <div class="in-about">
                <img src="static/imgs/bookicon3jpg.jpg" style="border-radius: 50%;" alt="">
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
          <h1><a href="/index_user">Bibleoticha<span>.</span></a></h1>
      </div>
      <div class="nav-center">
          <ul>
              <li class="homee"><a href="/index_user" class="home">Home</a></li>        
              <li><a href="/book/user_list">view list of books</a></li>
           
             
              <li class="log-out">
                
                     
                    
                       <button type="submit"  id="log_out">log out</button>
                      
                      

                 
              </li>
          </ul>
      </div>
      <div class="nav-right">
         <a href="contact us.html"> <i class="fa-solid fa-phone"></i></a>
      </div>
      </nav>
      
      
      
      
      
      <div class="about-profile">
      
      
      <div class="big">

        <div class="info">
      
            <h4>Profile Status</h4>
        
           <p><span>User Name:</span> ${last_name}</p> 
           
           <p><span>User Type:</span>${user_type}</p>
      
           
           
           
           
           </div>

           <div class="del-acc">

            <button class="bt-del">Delete Account</button>

              <p id="del-err"></p>

           </div>
    </div>

      
   
      
  
      
      
      
      
      
          <div class="left">
      
              <div class="inside-left">
      
                  <div class="img-inside-left">
      
      
                      <div class="icons-img-inside-left">
                          <i class="fa-brands fa-facebook"></i>
                          <i class="fa-brands fa-twitter"></i>
                          <i class="fa-brands fa-google"></i>
                          <i class="fa-brands fa-github"></i>
      
                      </div>
      
                  </div>
      
      
          </div>
      
      
      
      
      
      </div>
      
      </div> 
      
      
      
      
      <h2 class="book-title">${books_type}</h2>
      
      <main class="main1">
      
      
      <div class="slider" id="slider">
      
      
      
      
      
      
        
       <diV class="arrow">
                 
       <button class="left_button" > &lt </button>
       <button class="right_button"  > &gt </button>
       </diV>
          
  
      
        </div>
      
      
        
      
      
        </main>
      
      
      
      
      
        
      
      
      
      
      
        <footer class="fs" style="background: url( 'static/imgs/textured-metal-background.jpg' )">
        <div class="container5">
            <div class="about">
                <div class="in-about">
                    <img src="static/imgs/bookicon3jpg.jpg" style="border-radius: 50%;" alt="">
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
  
  
  
  
  
  if(is_admin==false){
  
  

     
  
      
      
      
      for(var i=0 ; i<borrowed_books.length ; ++i){

            var book_img=""
      
      
      
            for(var j=0 ; j<my_books.length ; ++j){
              if(my_books[j].id==borrowed_books[i].id){

                book_img=my_books[j].book_img

            }
          }
      
              let s=document.getElementById(`slider`);
              let book=document.createElement("div")
      
              book.setAttribute("class","book");
              book.setAttribute("data-id",borrowed_books[i].id);
      
      
      
              
              book.innerHTML=`  
      
              <div class="image" >
              <img src="/book_photos/${book_img}" alt="">
            </div>
            
            
            <div class="info">
            
              <div class="book-name"><span>Book Name:</span>${borrowed_books[i].bookname}</div>
            
              <div class="author">
                <span>Book Author: ${borrowed_books[i].author} </span>.
              </div>
          
              <div>
              <span>book Category : </span>${borrowed_books[i].category}
              </div>
                
              <button class="return">Return</button>
            
            </div>
            
              `
          s.prepend(book);
      
          
      }

}



else{

  
  for(var i=0 ; i<added_books.length ; ++i){
    
    
            
       var book_img=""

        for(var j=0 ; j<my_books.length ; ++j){
          if(my_books[j].id==added_books[i].id){
            
            book_img=my_books[j].book_img
            
          

        }
      }

  
          let s=document.getElementById(`slider`);
          let book=document.createElement("div")
  
          book.setAttribute("class","book");
          book.setAttribute("data-id",added_books[i].id);
  
  
  
          
          book.innerHTML=`  
  
          <div class="image" >
          <img src="/book_photos/${book_img}" alt="">
        </div>
        
        
        <div class="info">
        
          <div class="book-name"><span>Book Name:</span>${added_books[i].bookname}</div>
        
          <div class="author">
            <span>Book Author: ${added_books[i].author} </span>.
          </div>
      
          <div>
          <span>book Category : </span>${added_books[i].category}
          </div>
            
          <button id="edit" class="edit"><a href="/book/editbook">Edit</a></button>
          <button class="delete">Delete</button>
          
          </div>
          <div class="error-delete"></div>
        
          `
      s.prepend(book);
  
      
  }
}





        
                  
                  

                    
      
        
        
       
}
        
        

function edit(){


  if(document.querySelectorAll(".edit")!==null){

    document.querySelectorAll(".edit").forEach(function(ele){
  
      ele.addEventListener('click',function(){
  
    
      let info_div=this.parentElement; // info-div
    
            
      let src_div=info_div.parentElement; // book-div
    
    
      window.localStorage.setItem("edit_id",src_div.getAttribute("data-id"))
    })
      })
  
  
  }
  

}
        
        
     
        
async function request_return(id,so_div,src_div){



  try{
   
    console.log(csrfToken)
  
    var response= await fetch("/book/return",{
  
      method:"DELETE",
      body:JSON.stringify({
        book_id:id
  
      }),
  
      headers:{
  
  
        "content-type":'application/json',
        'X-CSRFToken': csrfToken,
      }
      
    })

    var message= await response.json();


    if(message.message=="succes"){

    
   
      so_div.removeChild(src_div);


    }

  }

  catch(err){

console.log(err)
  }

}

          

function return_book(){

  let return_button=document.querySelectorAll(".return");

  return_button.forEach(function(ele){
        
    let my_div=ele.parentElement; //info

    let src_div=my_div.parentElement; // book div

    let so_div=src_div.parentElement;

    
    
    
    ele.addEventListener("click",function(){


      console.log("on ret")

      request_return(src_div.getAttribute("data-id"),so_div,src_div)
      
   


  
})

})

}



function slider_move(){

  const animation_slider=document.querySelectorAll(".slider .book")

let counter=0;

let left_buttons=document.querySelectorAll(".left_button")
let right_buttons=document.querySelectorAll(".right_button")

console.log(left_buttons)
console.log(right_buttons)
console.log("hahaha")




left_buttons.forEach(function(ele){

  ele.addEventListener('click',function(){

    
    if(counter===0){
      
      counter=animation_slider.length/3 -1;

  }


  else{


  
          counter--;

      console.log(counter)
  }


  scroll();

  })
})


right_buttons.forEach(function(ele){

  ele.addEventListener('click',function(){

    if(counter===0){

      counter=1;
    }
    else{
        counter++;
      

    }



    scroll();
  })
})




function scroll(){
  console.log("scroll")
  console.log(animation_slider)

    animation_slider.forEach(function(item){
      console.log("sjjs")


      item.style.transform= `translateX(-${counter*500}px)`
    })
}


}
            

function press_book(){

  let item=document.querySelectorAll(".image");

console.log(item)

// console.log(item)
item.forEach(function(ele){



    ele.onclick=function(){

        let parent_ele=ele.parentElement;
         console.log(parent_ele)
        
        if(parent_ele.hasAttribute("data-id")){
        
          var this_id=parent_ele.getAttribute("data-id");
          sessionStorage.setItem("pressed_id",this_id)
          window.location.href="/book/book_page"

       

        }
    }
})

}


async function request_delete(this_book,error_place,so_div,src_div){


  try{
   
    console.log(csrfToken)


    let response= await fetch("/book/delbook",{
      method:"DELETE",
      body:JSON.stringify(this_book),

      headers:{
        "content-type":'application/json',
        'X-CSRFToken': csrfToken,
       
       
    }
  
    })
  
    let message=await response.json();


    if(message.message=="can not delete"){


      error_place.innerHTML=message.message;
      setTimeout(function(){
        error_place.innerHTML=""
    },3000)
   

    }

    else{
      so_div.removeChild(src_div);

      refresh();
    }

    

  }


  catch(err){


  }

}



function delete_book(){

  let delete_button=document.querySelectorAll(".delete")






if(delete_button!=null){
  console.log(delete_button)
  


    delete_button.forEach(function(current_button){
    


    
    
    
        current_button.addEventListener("click",function(){
    
    
            let info_div=current_button.parentElement; // info-div

            console.log(info_div)
         
        
            let src_div=info_div.parentElement; // book-div
         
            console.log(src_div)
            // console.log(src_div)
            
            
            let so_div=src_div.parentElement; //slider-div
          
        
    
            let y=info_div.nextElementSibling; //error-div

            this_book={'book_id':src_div.getAttribute("data-id")
                          
                           
            }

            console.log(y)

            request_delete(this_book,y,so_div,src_div);

           

       
            
   
    
    
    
           
    
    
        })
        
    })

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


async function request_delete_account(del_err){



  try{

    var response= await fetch("sign/delete-account",{
  
      method:"DELETE",
      body:JSON.stringify({
        name:last_name,
        password:last_password,
        status:is_admin
      }),
  
  
      headers:{
        "content-type":'application/json',
        'X-CSRFToken': csrfToken,
       
       
    }
  
      
    })
  
    var message= await response.json();
  
  
    if(message.message=="user does not exits"){
  
      del_err.innerHTML=message.message
      del_err.style.color="red"
  
  
    }
  
    else{
  
      del_err.innerHTML=message.message;
       del_err.style.color="green"
  
       setTimeout(function(){
  
     
  
          request_log_out();
    
     
       },2000)
  
  
    }
  }

  catch(err){

    console.log(err)
  }

}

function delete_account(){


  let account_delete=document.querySelectorAll(".bt-del")


  account_delete.forEach(function(ele){


    ele.addEventListener("click",function(){


    let del_err=document.getElementById("del-err")
    request_delete_account(del_err);

    })
  })
}



async function main(){

  await get_last();
  await get_books();

  if(is_admin){
    await get_added();
  }

  else{
   await get_borrowed();
  }

  display();
  edit();
  slider_move();
  press_logout();
  press_book();
  return_book();
  delete_book();
  delete_account();


}
main()

