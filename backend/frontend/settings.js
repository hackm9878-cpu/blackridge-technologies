const API =
"https://blackridge-technologies-1.onrender.com";



const user =
JSON.parse(
localStorage.getItem("user")
);



// =====================
// LOAD USER
// =====================
document.getElementById(
"name"
).value =
user.name || "";


document.getElementById(
"username"
).value =
user.username || "";




// =====================
// SAVE SETTINGS
// =====================
async function saveSettings(){

const name =
document.getElementById(
"name"
).value;


const username =
document.getElementById(
"username"
).value;


const password =
document.getElementById(
"password"
).value;



try{

const response =
await fetch(
`${API}/update-settings`,
{

method:"POST",

headers:{
"Content-Type":
"application/json"
},

body:JSON.stringify({

id:user._id,

role:user.role,

name,

username,

password

})

});



const data =
await response.json();

alert(data.message);



// UPDATE LOCAL USER
user.name = name;
user.username = username;

localStorage.setItem(
"user",
JSON.stringify(user)
);

}catch(error){

console.log(error);

}

}




// =====================
// GO BACK
// =====================
function goBack(){

if(user.role === "admin"){

window.location.href =
"dashboard.html";

}else{

window.location.href =
"staff-dashboard.html";

}

}




// =====================
// LOGOUT
// =====================
function logout(){

localStorage.removeItem(
"user"
);

window.location.href =
"login.html";

}