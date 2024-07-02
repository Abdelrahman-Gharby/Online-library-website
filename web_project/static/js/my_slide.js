


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



var div_books=[]
var my_books=[]
var is_admin=false;
var last_name="";
var last_password="";

var c=0;

const csrfToken = document.querySelector("[name=csrfmiddlewaretoken]").value;

async function get_books(){


  try{

     
      var response= await fetch("/book/getbooks")

      var message= await response.json();

    

      if(message.message=="ok" ){
      


        my_books=[];
        

          
      for(var key in message.books){
       
          
        my_books.push(new book(message.books[key].book_id,message.books[key].title,
          message.books[key].book_author,message.books[key].book_category,message.books[key].book_img,
          message.books[key]. book_descrption,message.books[key].is_borrowed));
      }

     


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

    

  
      

        for(var key in message.last){

     
          is_admin=message.last[key].is_admin;
         
          last_name=message.last[key].name;
          last_password=message.last[key].password;
  
        }

       
      

  }

  catch(err){

      console.log(err)
  }



}




function display(arr){


  let wrapper=document.getElementById("all-books")
  var car='';

  for(var i=0 ; i<arr.length ; ++i){

      car=car+`
      <div class="book-container-show" data-id="${arr[i].id}">
      
            
      
      <div class="book-img-show image">
      <img src="/book_photos/${arr[i].book_img}" >
      </div>

      <div class="book-info-show">

        <p><span>Book Title:</span>${arr[i].name}</p>

        <p><span>book author:</span>${arr[i].author}</p>
      </div>
    </div>

      
      `
  }

  wrapper.innerHTML=car





}




function display_slider(){


  

  for(var i=0 ; i<my_books.length; ++i){





    let p=document.getElementById(`slider-${my_books[i].category.toLowerCase()}`)
    let this_book=document.createElement("div")
  
    this_book.setAttribute("class","book");
    this_book.setAttribute("data-id",my_books[i].id)
  
    if(!is_admin){
  
        this_book.innerHTML=`  
  
        <div class="image" >
        <img src="/book_photos/${my_books[i].book_img}" alt="">
      </div>
      
      
      <div class="info">
      
        <div class="book-name"><span class="bookname">Book Name : </span>${my_books[i].name}</div>
      
        <div class="author">
          <span class="auth">Book Author : </span> ${my_books[i].author}
        </div>
      
        
          <button class="borrow" data-borrowed="${my_books[i].borrowed}" >Borrow</button>
          <div class="error-borrow"></div>
      
      </div>
      
        `
    p.prepend(this_book);
    div_books.push(this_book)
  
    }
  
    else{
        this_book.innerHTML=`  
        
       
              
        <div class="image" >
          <img src="/book_photos/${my_books[i].book_img}" alt="">
          </div>
          
               <div class="info">
          
        

               
        <div class="book-name"><span class="bookname">Book Name : </span>${my_books[i].name}</div>
      
        <div class="author">
          <span class="auth">Book Author : </span> ${my_books[i].author} 
        </div>
        
          
       
   
          
                          
                  <button id="edit" class="edit" ><a href="/book/editbook">Edit</a></button>
          
             
                    
              <button  class="delete">Delete</button>
    
            </form>
          
          </div>
          <div class="error-delete"></div>
        
        </div>
       
        
        
        `
  
       ;
  
       p.prepend(this_book);
       div_books.push(this_book)
    }
  
  
  
    
  
  }


}

async function get_search(key,value){

  let results=[];

  try{

    console.log("hi")
    console.log(key,value)

    let response=await fetch("/book/search",{

      method:"POST",
      body:JSON.stringify({
        key:key,
        value:value,
      }),

      headers:{

        "content-type":'application/json',
        'X-CSRFToken': csrfToken,

      }

    })

    var message=await response.json();

    console.log(message)

    results=message.book;

    console.log(results)
    return results;
  }


  catch(err){


    console.log(err)

  }


}


function serach(){

  let it=document.getElementById("search-term")
  let wrapper=document.getElementById("all-books");



it.oninput= async function(){
  
  
  let  chossen=document.getElementById("select_search").value;
  var val_ch=chossen
  
  let val=it.value
  


  let results= await get_search(val_ch,val);



 



  var car='';

  if(results.length==0){
    wrapper.style.height="230px"
  }

  else{
    wrapper.style.height="auto"
  }


  for(var i=0 ; i<results.length ; ++i){


      
 
    car=car+`
    <div class="book-container-show" data-id="${results[i].book_id}">
    
         
    
    <div class="book-img-show image">
      <img src="/book_photos/${results[i].book_img}" >
    </div>

    <div class="book-info-show">

      <p><span>Book Title:</span>${results[i].title}</p>

      <p><span>book author:</span>${results[i].book_author}</p>
    </div>
  </div>

    
    `
  }

  wrapper.innerHTML=car


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

async function request_borrow(this_book,error_place,ele){


  try{

   


    let response= await fetch("/book/borrow",{
      method:"PUT",
      body:JSON.stringify(this_book),

      headers:{
        "content-type":'application/json',
        'X-CSRFToken': csrfToken,
       
       
    }
  
    })
  
    let message=await response.json();


    if(message.message=="borrowed"){
      

                
        



      error_place.innerHTML=message.message;
      setTimeout(function(){
        error_place.innerHTML=""
    },3000)
   

    }

    else{

      ele.setAttribute("data-borrowed","true")

      refresh();
    }

    

  }


  catch(err){


  }



}


function borrow_book(){

  
let current_button=document.querySelectorAll(".borrow");
    
   









current_button.forEach(function(ele){

  
  ele.addEventListener("click",function(){
      
      let info_div=ele.parentElement;

      let book_div=info_div.parentElement ;
      let book_id=book_div.getAttribute("data-id");


      var this_book="";


      for(var i=0 ; i<my_books.length ; ++i){

        if(my_books[i].id==book_id){


          this_book={
            'book_id':my_books[i].id
              ,'book_name':my_books[i].name,
              'author':my_books[i].author,                                      
              'category':my_books[i].category,
              'UserName':last_name,
              'password':last_password,

          }

 
            break;



        }
    }

        

        let y=ele.nextElementSibling;

        request_borrow(this_book,y,ele)
      
           

                       
        
        }
    )

})


}



async function request_delete(this_book,error_place,so_div,src_div){


  try{
    
  


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
 
  


    delete_button.forEach(function(current_button){
    


    
    
    
        current_button.addEventListener("click",function(){
    
    
            let info_div=current_button.parentElement; // info-div
         
        
            let src_div=info_div.parentElement; // book-div
         
            
           
            
            
            let so_div=src_div.parentElement; //slider-div
          
        
    
            let y=info_div.nextElementSibling; //error-div

            this_book={'book_id':src_div.getAttribute("data-id")
                          
                           
            }

            request_delete(this_book,y,so_div,src_div);

           

       
            
   
    
    
    
           
    
    
        })
        
    })

}
    

}

function slider_move(){

  const animation_slider=document.querySelectorAll(".slider .book")

let counter=0;

let left_buttons=document.querySelectorAll(".left_button")
let right_buttons=document.querySelectorAll(".right_button")






left_buttons.forEach(function(ele){

  ele.addEventListener('click',function(){

   
    if(counter===0){
      
      counter=animation_slider.length/3 -1;

  }


  else{


  
          counter--;

     
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

  
  
 
  item.forEach(function(ele){
    
    
    
    ele.onclick=function(){

      

        let parent_ele=ele.parentElement;
        
        
        if(parent_ele.hasAttribute("data-id")){
        
          var this_id=parent_ele.getAttribute("data-id");
          sessionStorage.setItem("pressed_id",this_id)
          window.location.href="/book/book_page"

       

        }
    }
})

}
    





async function main(){



  await get_books();
  await get_last();
  display(my_books);
  display_slider();
  press_book();
  serach();
  slider_move();
  edit();
  borrow_book();
  delete_book();
 


}
main();



// setInterval(()=>{

//   refresh();
// },5000)

async function refresh(){

  await get_books();
  display(my_books);

}
