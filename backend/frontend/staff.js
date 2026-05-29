const API =
"https://blackridge-technologies-1.onrender.com";



// LOAD STAFF
async function loadStaff(){

const response =
await fetch(
`${API}/staff`
);

const staff =
await response.json();


const staffList =
document.getElementById(
"staffList"
);

staffList.innerHTML = "";



staff.forEach(worker=>{

staffList.innerHTML += `

<div class="product">

<h2>
${worker.name}
</h2>

<p>
State:
${worker.state}
</p>

<p>
Username:
${worker.username}
</p>

<p>
Products:
${worker.products.length}
</p>

<button
onclick="
viewStaff(
'${worker._id}'
)
">

View Staff

</button>

</div>

`;

});

}



// ADD STAFF
async function addStaff(){

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


const state =
document.getElementById(
"state"
).value;



await fetch(
`${API}/add-staff`,
{

method:"POST",

headers:{
"Content-Type":
"application/json"
},

body:JSON.stringify({

name,
username,
password,
state

})

});



alert(
"Staff Added"
);


loadStaff();

}



// VIEW STAFF
function viewStaff(id){

localStorage.setItem(
"staffId",
id
);


window.location.href =
"staff-details.html";

}



loadStaff();