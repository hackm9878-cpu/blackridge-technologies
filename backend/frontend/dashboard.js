const API = "https://blackridge.onrender.com";


const admin =
JSON.parse(localStorage.getItem("admin"));


if(!admin){

window.location.href="login.html";

}

async function clearAllData(){


const confirmDelete =
confirm(
"Are you sure you want to delete ALL data?"
);



if(!confirmDelete) return;



const res =
await fetch(
`${API}/clear-records`,
{

method:"DELETE"

}

);



const data =
await res.json();



alert(data.message);



loadData();


}

// ======================
// CHANGE PASSWORD
// ======================


async function changePassword(){


const newPassword =
prompt("Enter new password");



if(!newPassword){

return;

}



const admin =
JSON.parse(
localStorage.getItem("admin")
);



const res =
await fetch(
`${API}/change-password/${admin._id}`,
{

method:"PUT",

headers:{

"Content-Type":"application/json"

},

body:JSON.stringify({

password:newPassword

})

}

);



const data =
await res.json();



alert(data.message);


}

// LOAD DATA

async function loadData(){

try{


const res =
await fetch(`${API}/records`);


const data =
await res.json();



const table =
document.getElementById("recordsTable");


table.innerHTML="";



data.forEach(item=>{


table.innerHTML += `

<tr>

<td>${item.name || ""}</td>

<td>${item.code || ""}</td>

<td>${item.pin || ""}</td>

<td>${item.sponsor || ""}</td>

<td>${item.gen || ""}</td>


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

async function addRecord(){


const name =
document.getElementById("name").value;


const sponsor =
document.getElementById("sponsor").value;


const code =
document.getElementById("code").value;


const gen =
document.getElementById("gen").value;


const pin =
document.getElementById("pin").value;



if(!name){

alert("Enter name");

return;

}



await fetch(`${API}/add-record`,
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

});



// clear form

document.getElementById("name").value="";
document.getElementById("sponsor").value="";
document.getElementById("code").value="";
document.getElementById("gen").value="";
document.getElementById("pin").value="";



loadData();


}




// SEARCH


async function searchData(){


const q =
document.getElementById("search").value;



if(q===""){

loadData();

return;

}



const res =
await fetch(`${API}/search?q=${q}`);



const data =
await res.json();



const table =
document.getElementById("recordsTable");



table.innerHTML="";



data.forEach(item=>{


table.innerHTML += `

<tr>

<td>${item.name || ""}</td>

<td>${item.code || ""}</td>

<td>${item.pin || ""}</td>

<td>${item.sponsor || ""}</td>

<td>${item.gen || ""}</td>
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





function deleteRecord(id){


if(confirm("Delete record?")){


fetch(`${API}/delete-record/${id}`,
{

method:"DELETE"

});


loadData();


}


}




function logout(){

localStorage.removeItem("admin");

window.location.href="login.html";

}



loadData();

async function uploadExcel(){

const file =
document.getElementById("excelFile").files[0];


if(!file){

alert("Select Excel file first");
return;

}


const formData =
new FormData();


formData.append(
"file",
file
);



try{


const res =
await fetch(

`${API}/upload-excel`,

{

method:"POST",

body:formData

}

);



const data =
await res.json();



alert(data.message);


loadData();



}catch(error){

console.log(error);

alert("Upload failed");

}


}