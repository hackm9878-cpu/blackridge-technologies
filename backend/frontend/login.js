const API =
"https://blackridge-technologies-1.onrender.com";



async function login(){

try{

const username =
document.getElementById(
"username"
).value;

const password =
document.getElementById(
"password"
).value;



if(!username || !password){

document.getElementById(
"message"
).innerText =
"Enter Username And Password";

return;

}



const response =
await fetch(

`${API}/login`,

{

method:"POST",

headers:{

"Content-Type":
"application/json"

},

body:JSON.stringify({

username,
password

})

}

);



const data =
await response.json();



if(response.ok){

localStorage.setItem(

"user",

JSON.stringify(
data.user
)

);



window.location.href =
"index.html";

}else{

document.getElementById(
"message"
).innerText =
data.message;

}

}catch(error){

console.log(error);

document.getElementById(
"message"
).innerText =
"Server Error";

}

}