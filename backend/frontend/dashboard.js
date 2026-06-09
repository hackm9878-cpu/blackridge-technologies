const API = "https://blackridge.onrender.com";


// ======================
// CHECK LOGIN
// ======================

const admin =
JSON.parse(localStorage.getItem("admin"));


if(!admin){

window.location.href="login.html";

}



// ======================
// LOAD DATA
// ======================

async function loadData(){

try{


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



table.innerHTML = "";



data.forEach(item=>{


table.innerHTML += `

<tr>

<td>${item.name || ""}</td>

<td>${item.sponsor || ""}</td>

<td>${item.code || ""}</td>

<td>${item.gen || ""}</td>

<td>${item.pin || ""}</td>


<td>

<button onclick="editRecord('${item._id}')">
Edit
</button>


<button onclick="deleteRecord('${item._id}')">
Delete
</button>


</td>


</tr>

`;

});


}catch(error){

console.log(error);

}

}





// ======================
// ADD RECORD
// ======================


async function addRecord(){


const name =
prompt("Name");


const sponsor =
prompt("Sponsor");


const code =
prompt("Code");


const gen =
prompt("GEN");


const pin =
prompt("PIN");



if(!name) return;



await fetch(

`${API}/add-record`,

{

method:"POST",

headers:{

"Content-Type":"application/json"

},

body:JSON.stringify({

name,
sponsor,
code,
gen,
pin

})

}


);



loadData();


}






// ======================
// SEARCH
// ======================


async function searchData(){


const q =
document.getElementById(
"search"
).value;



if(q===""){

loadData();

return;

}



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


table.innerHTML += `

<tr>

<td>${item.name || ""}</td>

<td>${item.sponsor || ""}</td>

<td>${item.code || ""}</td>

<td>${item.gen || ""}</td>

<td>${item.pin || ""}</td>


<td>

<button>
Edit
</button>


<button>
Delete
</button>


</td>

</tr>


`;

});


}





// ======================
// DELETE
// ======================


async function deleteRecord(id){


if(!confirm("Delete record?"))
return;



await fetch(

`${API}/delete-record/${id}`,

{

method:"DELETE"

}

);



loadData();


}






// ======================
// EDIT
// ======================


function editRecord(id){

alert(
"Edit system coming next"
);

}






// ======================
// LOGOUT
// ======================


function logout(){


localStorage.removeItem(
"admin"
);



window.location.replace(
"login.html"
);


}





loadData();