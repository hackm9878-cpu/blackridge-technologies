const API = "https://blackridge.onrender.com";


async function login(){


const username =
document.getElementById("username").value;


const password =
document.getElementById("password").value;



try{


const res = await fetch(
`${API}/login`,
{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({

username,
password

})

});


const data =
await res.json();



if(res.ok){


localStorage.setItem(
"admin",
JSON.stringify(data.admin)
);



window.location.href =
"dashboard.html";


}
else{


document.getElementById(
"message"
).innerHTML =
data.message;


}



}catch(err){

console.log(err);

}



}