
class user{
    
  constructor(x,y,z,e){

    this.name=x;
    this.pass=y;
    this.email=z;
    this.admin=e
   

  }
}


class book{

  constructor(id){

    this.id=id;

  }
}

let pass_lock=document.getElementById("pass-lock");

let back_page=document.getElementById("back")


var my_users=[];
var my_books=[]

const csrfToken = document.querySelector("[name=csrfmiddlewaretoken]").value;



if ( document.getElementById("old_book_id")!=null){
  document.getElementById("old_book_id").value=window.localStorage.getItem("edit_id")
}

if(back_page!=null){


  var ind=document.referrer


  back_page.value=ind.slice(22)
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









async function sign_in(hamada){


  try{

     
      var response= await fetch("/sign/signin",{
          method:"POST",
          body:JSON.stringify(hamada),
          headers:{
              "content-type":'application/json',
              'X-CSRFToken': csrfToken,
             
          }
  
      })

      var message= await response.json();

   

      if(message.message=="wrong password or user name" ){
       
          var error_text=document.getElementById("not-found")
          error_text.innerHTML=message.message
          error_text.style.color="red"

          setTimeout(() => {
            error_text.innerHTML=""
          }, 4000);
      }

      else{


        if(message.message=="is_admin"){

          window.location.href="/index_admin"
        }

        else{

            window.location.href="/index_user"
        }
      }


  }

  catch(err){

      console.log(err)
  }



}


async function sign_Up(us){



  try{

     
    var response= await fetch("/sign/",{
        method:"POST",
        body:JSON.stringify(us),
        headers:{
            "content-type":'application/json',
            'X-CSRFToken': csrfToken,
           
        }

    })

    var message= await response.json();

    console.log(message)

    if(message.message=="username exists"){
      console.log(message.username)
        var error_text=document.getElementById("error1")
        error_text.innerHTML=message.message
        error_text.style.color="red"
    }

    else{


      if(message.message=="is_admin"){

        window.location.href="/index_admin"
      }

      else{

          window.location.href="/index_user"
      }
    }


}

catch(err){

    console.log(err)
}

}


async function add_book(book){


  try{

     
    var response= await fetch("/book/",{
        method:"POST",
        body:JSON.stringify(book),
        headers:{
            "content-type":'application/json',
            'X-CSRFToken': csrfToken,
           
        }

    })

    var message= await response.json();

    console.log(message)

    if(message.message=="registerd id"){
      console.log(message.username)
        var error_text=document.getElementById("error1")
        error_text.innerHTML=message.message
        error_text.style.color="red"
    }

    else{


      if(message.message=="succes")

      window.location.href=document.referrer;
        

      
    }


}

catch(err){

    console.log(err)
}

}

async function edit_book(book){


  try{

     
    var response= await fetch("/book/editbook",{
        method:"PUT",
        body:JSON.stringify(book),
        headers:{
            "content-type":'application/json',
            'X-CSRFToken': csrfToken,
           
        }

    })

    var message= await response.json();

    console.log(message)

    if(message.message=="registerd id"){
      console.log(message.username)
        var error_text=document.getElementById("error1")
        error_text.innerHTML=message.message
        error_text.style.color="red"
    }

    else{


      if(message.message=="succes"){

        window.location.href=document.referrer;
      }
      

      
    }


}

catch(err){

    console.log(err)
}

}




function validate(){

 


    
    
    //user info
    //=====================================================================================
    
    const password = document.getElementById('password');                                
    
    const username=document.getElementById("username");
    
    const email=document.getElementById("email");
    
    const confirm_password=document.getElementById("confirm-password");
    
    const is_admin=document.getElementById('is_admin');
    
    
    //===================================================================================
    
    
    
    //book info
    //======================================================================================
    
    const book_id = document.getElementById('book_id');
    
    const book_name = document.getElementById('book_name');
    
    const book_author=document.getElementById("book_author");
    
    const od_book_id=document.getElementById("old_book_id")
    
    let category_book=document.getElementById("category");
    
    //==========================================================================================
    
    
    //progra data
    
    
    
    //===================================================================================
    
    
    // program classes
    
    
    
    //=====================================================================
    
    
    
      if(pass_lock!=null && password!=null){
    
        pass_lock.onclick=function(){
          
          if(password.type=="password"){
            password.type="text";
          }
        
          else{
            password.type="password";
          }
        }
    
      }  
      
    
    
    
    //=================================================================
    
    // forms
    
    const sign_in_form = document.getElementById('sign-in-form');
    
    
    const sign_up_form=document.getElementById("sign-up-form");
    
    const add_book_form=document.getElementById("add-book-form");
    
    
    const edit_book_form=document.getElementById("edit-book-form");
    
    
    
    if(sign_in_form!=null){
    
      sign_in_form.onsubmit=function(event){
    
    
        let user_valid=true;
        let pass_valid=true;
        let user_in=false;
    
    
    
      const username_val = document.getElementById('username').value.trim();
      const password_val = document.getElementById('password').value.trim();
    
    
    
      // Check if the input fields are empty
    
    
    
      if (username_val === '') {
        // If the username field is empty, show an error message
        document.getElementById('error1').innerText = 'Please enter a username.';
        user_valid=false
      } 
    
      else{
        document.getElementById('error1').innerText = '';
        user_valid=true;
    
      }
    
      if (password_val=== '') {
        // If the password field is empty, show an error message
        document.getElementById('error2').innerText = 'Please enter a password.';
        pass_valid=false;
      } 
    
    
      else if( password_val.length<8){
    
        document.getElementById('error2').innerText = 'minimum is 8 charcters';
        pass_valid=false;
      } 
      
    
      else{
        document.getElementById('error2').innerText = '';
        pass_valid=true;
      }
    
    
    
    
    
      if(user_valid===false || pass_valid===false){
     
        event.preventDefault();
        return;
      }
    
      



      else{

        event.preventDefault();

        var us={

          UserName:username_val,
          password:password_val,
        }

       

        sign_in(us)
      }
    
    

    
      
    
    
      }
    
          
    
    
    }
    
    
    
    
    
    
    
      
    
    
    if(sign_up_form!=null){
    
    
    
    
    
    
     
    
    
    
      sign_up_form.onsubmit=function(event){
      
        let user_valid=true;
        let pass_valid=true;
        let conf_pas=true;
        let email_conf=true;
      
      
      
      // Get the values of the input fields
      const username_val = document.getElementById('username').value.trim();
      const password_val = document.getElementById('password').value.trim();
      const confirm_pass_val=document.getElementById("confirm-password").value.trim();
      const email_val=document.getElementById("email").value.trim();
      
      
      // Check if the input fields are empty
      
      
      
      if (username_val === '') {
        // If the username field is empty, show an error message
        document.getElementById('error1').innerText = 'Please enter a username.';
        user_valid=false
      } 
      

      if (password_val=== '') {
        // If the password field is empty, show an error message
        document.getElementById('error2').innerText = 'Please enter a password.';
        pass_valid=false;
      } 
      
      
      else if( password_val.length<8){
      
        document.getElementById('error2').innerText = 'minimum length 8 charcters ';
        pass_valid=false;
      } 
      
      else{
      
        
        document.getElementById('error2').innerText = '';
        pass_valid=true;
      
      }
      
      
      if(confirm_pass_val!==password_val){
      
        document.getElementById('error3').innerText = 'confirm password is wrong';
        conf_pas=false;
      
      }
      
      else if(confirm_pass_val===''){
      
        document.getElementById('error3').innerText = 'confirm password is required';
        conf_pas=false;
      
      }
      
      else{
      
        document.getElementById('error3').innerText = '';
        conf_pas=true;
      }
      
      
      
      // re matches the email_val with the regular expression
        const re =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
      
      
      
      if(email_val===''){
      
        document.getElementById('error4').innerText = 'email is required';
       
        email_conf=false;
      
      }
      
      else if(!re.test(String(email_val).toLowerCase())){
      
        document.getElementById('error4').innerText = 'invalid email';
       
        email_conf=false;
      }
      
      else{
      
        
        document.getElementById('error4').innerText = '';
       
        email_conf=true;
      
      }
      
      
      let admin_status=""
      
      if(is_admin.checked){
    
         admin_status="true"
         is_admin.value="true";
      }
    
        else  {
         
          admin_status="false"
         is_admin.value="false";
    
    
        }
    
      
      
      
      if( user_valid==false || pass_valid===false || conf_pas===false || email_conf==false){
        
        event.preventDefault();
      }


      else{


        event.preventDefault();
        var my_user={

          UserName:username_val,
          password:password_val,
          email:email_val,
          is_admin:admin_status,


        }
        sign_Up(my_user)
        
      
 
        
        
      }
      
      
    
      
      }
      
      
    
}
    
    
    
        
      
    
    

if(add_book_form!=null){


  add_book_form.onsubmit=function(event){
  
    let bookid_valid=true;
    let bookname_valid=true;
    let book_author_valid=true;
    let found=false;
    
    
  
  
  
    const bookid_val = document.getElementById('book_id').value.trim();
    const bookname_val = document.getElementById('book_name').value.trim();
    const bookauthor_val=document.getElementById("book_author").value.trim();
    const book_category_val=document.getElementById("category").value
    const book_img_val=document.getElementById("image").files[0].name;
    const book_descreption_val=document.getElementById("descreption").value
    console.log(book_img_val)


    let category_val=document.getElementById("category").value;
  
  
    var te=/^[-+]?[0-9]+$/;
  
  
    
  
  
  
  
    
      if(bookid_val==''){
    
        document.getElementById('error1').innerText = 'Please enter a book id.';
        bookid_valid=false
    
      }
    
    
      else if(bookid_val <=0 )
      {
    
        document.getElementById('error1').innerText = 'invalid book id';
        bookid_valid=false
    
    }
    
    else if(! bookid_val.match(te)){
    
      document.getElementById('error1').innerText = 'only numbers';
      bookid_valid=false
    
    }
    

  
  
  
  if(bookname_val==''){
  
    document.getElementById('error2').innerText = 'Please enter a book name';
    bookname_valid=false
  
  }
  
  else if(bookname_val.length <5 )
  {
  
    document.getElementById('error2').innerText = 'minimum length 5 charcters';
    bookname_valid=false
  
  }
  
  else{
  
    document.getElementById('error2').innerText = '';
    bookname_valid=true
  }
  
  
  if(bookauthor_val==""){
  
    
    document.getElementById('error3').innerText = 'Please enter a book author';
    book_author_valid=false
  
  }
  
  else if(bookauthor_val <5){
  
    document.getElementById('error3').innerText = 'invalid book author';
    book_author_valid=false
  }
  
  else{
  
    
    document.getElementById('error3').innerText = '';
    book_author_valid=true;
  
  }
  
  
  if(bookid_valid===false || bookname_valid===false || book_author_valid===false || found==true ){
  
    event.preventDefault();
    return false;
  }


  else{

    event.preventDefault();

    var this_book={

      book_id:bookid_val,
      book_name:bookname_val,
      author:bookauthor_val,
      category:book_category_val,
      image:book_img_val,
      descreption:book_descreption_val,


    }

    add_book(this_book)
  }
      

  
  
  


}

}
    
    
    
    
    
    
    
    
    
    
    
    
if(edit_book_form!=null){



  edit_book_form.onsubmit=function(event){


  let bookid_valid=true;
  let bookname_valid=true;
  let book_author_valid=true;
  let old_id_valid=true;

  let found_new=false;
  let found_old=false;


  let new_pos=0;









  var bookid_val = document.getElementById('book_id').value.trim();
  var bookname_val = document.getElementById('book_name').value.trim();
  var bookauthor_val=document.getElementById("book_author").value.trim();
  var old_id_val=document.getElementById("old_book_id").value.trim()
  let category_val=document.getElementById("category").value;
  const book_descreption_val=document.getElementById("descreption").value






  var te=/^[-+]?[0-9]+$/;


  

  if(old_id_val==''){

      
    document.getElementById('error1_o').innerText = 'Please enter a book id.';
    old_id_valid=false

  }

  else if(old_id_val <=0){

    
    document.getElementById('error1_o').innerText = 'invalid book id';
    old_id_valid=false
  }

  else if(! old_id_val.match(te)){
  
    document.getElementById('error1_o').innerText = 'only numbers';
    old_id_valid=false
  
  }




  
    if(bookid_val==''){
  
      document.getElementById('error1').innerText = 'Please enter a book id.';
      bookid_valid=false
  
    }
  
  
    else if(bookid_val <=0 )
    {
  
      document.getElementById('error1').innerText = 'invalid book id';
      bookid_valid=false
  
  }
  
  else if(! bookid_val.match(te)){
  
    document.getElementById('error1').innerText = 'only numbers';
    bookid_valid=false
  
  }
  




if(bookname_val==''){

  document.getElementById('error2').innerText = 'Please enter a book name';
  bookname_valid=false

}

else if(bookname_val.length <5 )
{

  document.getElementById('error2').innerText = 'invalid book name';
  bookname_valid=false

}

else{

  document.getElementById('error2').innerText = '';
  bookname_valid=true
}


if(bookauthor_val==""){

  
  document.getElementById('error3').innerText = 'Please enter a book author';
  book_author_valid=false

}

else if(bookauthor_val <5){

  document.getElementById('error3').innerText = 'invalid book author';
  book_author_valid=false
}

else{

  
  document.getElementById('error3').innerText = '';
  book_author_valid=true;

}


if((bookid_valid===false || bookname_valid===false || book_author_valid===false 
)){

  event.preventDefault();
  return false;
}

else{

  event.preventDefault();


  var this_book={
    old_book_id:old_id_val,
    book_id:bookid_val,
    book_name:bookname_val,
    author:bookauthor_val,
    category:category_val,
    descreption:book_descreption_val,


  }

  edit_book(this_book)
}
    


}

  

}
    
    


}







async function main(){

  validate();


}

main()





