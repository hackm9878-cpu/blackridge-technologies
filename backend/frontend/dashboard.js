const API = "https://blackridge.onrender.com";


// CHECK LOGIN
const admin = JSON.parse(
    localStorage.getItem("admin")
);


if(!admin){

    window.location.href = "login.html";

}



// LOAD DATA
async function loadData(){

try{

const res = await fetch(
`${API}/records`
);


const data = await res.json();


const table =
document.getElementById("recordsTable");


table.innerHTML = "";



data.forEach(item=>{


table.innerHTML += `

<tr>

<td>${item.name}</td>

<td>${item.sponsor}</td>

<td>${item.code}</td>

<td>${item.gen}</td>

<td>${item.pin}</td>


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



// ADD RECORD

function addRecord(){

window.location.href="add.html";

}



// DELETE

async function deleteRecord(id){


if(!confirm("Delete this data?"))
return;



await fetch(

`${API}/delete-record/${id}`,

{

method:"DELETE"

}

);


loadData();


}





// LOGOUT

function logout(){


localStorage.removeItem(
"admin"
);


window.location.href =
"login.html";


}




loadData();