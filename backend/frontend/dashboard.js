const API = "https://blackridge.onrender.com";


// CHECK LOGIN

const admin =
localStorage.getItem("admin");


if(!admin){

window.location.replace(
"login.html"
);

}



// LOAD DATA

async function loadData(){

try{


const res = await fetch(
`${API}/records`
);


const data = await res.json();



const table =
document.getElementById(
"recordsTable"
);


table.innerHTML="";



data.forEach(item=>{


table.innerHTML += `

<tr>

<td>${item.name}</td>

<td>${item.sponsor}</td>

<td>${item.code}</td>

<td>${item.gen}</td>

<td>${item.pin}</td>


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


}catch(error){

console.log(error);

}


}





// SEARCH

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


table.innerHTML += `

<tr>

<td>${item.name}</td>

<td>${item.sponsor}</td>

<td>${item.code}</td>

<td>${item.gen}</td>

<td>${item.pin}</td>

<td>

<button>Edit</button>

<button>Delete</button>

</td>


</tr>


`;

});


}




function logout(){


localStorage.removeItem(
"admin"
);


window.location.href =
"login.html";


}



loadData();