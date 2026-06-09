const API = "https://blackridge.onrender.com";

async function loadData(){


const res =
await fetch(
`${API}/records`
);


const data =
await res.json();



const table =
document.getElementById(
"recordsTable"
);



table.innerHTML="";



data.forEach(item=>{


table.innerHTML +=`

<tr>

<td>${item.name}</td>

<td>${item.code}</td>

<td>${item.pin}</td>

<td>${item.sponsor}</td>

<td>${item.gen}</td>


</tr>


`;


});


}




async function addRecord(){



const body={


name:
prompt("Name"),


sponsor:
prompt("Sponsor"),


code:
prompt("Code"),


gen:
prompt("GEN"),


pin:
prompt("Pin")

};



await fetch(
`${API}/add-record`,
{


method:"POST",

headers:{

"Content-Type":
"application/json"

},


body:
JSON.stringify(body)


});


loadData();


}





async function searchData(){


const q =
document.getElementById(
"search"
).value;



const res =
await fetch(
`${API}/search?q=${q}`
);



const data =
await res.json();



const table =
document.getElementById(
"recordsTable"
);



table.innerHTML="";



data.forEach(item=>{


table.innerHTML +=`

<tr>

<td>${item.name}</td>

<td>${item.code}</td>

<td>${item.pin}</td>

<td>${item.sponsor}</td>

<td>${item.gen}</td>

</tr>

`;


});


}



function logout(){

localStorage.removeItem(
"admin"
);


window.location.href="login.html";


}




document
.getElementById("search")
.addEventListener(
"keyup",
searchData
);



loadData();