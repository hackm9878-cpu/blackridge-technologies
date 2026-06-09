
const admin =
JSON.parse(localStorage.getItem("admin"));


if(!admin){

window.location.href =
"login.html";

}

const API =
"https://blackridge.onrender.com";


let editID = null;




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


}






async function addRecord(){



const body={


name:
document.getElementById("name").value,


sponsor:
document.getElementById("sponsor").value,


code:
document.getElementById("code").value,


gen:
document.getElementById("gen").value,


pin:
document.getElementById("pin").value



};





let url =
"/add-record";



let method =
"POST";





if(editID){


url =
"/update-record/"+editID;


method =
"PUT";


}






await fetch(
API+url,
{


method,


headers:{


"Content-Type":
"application/json"


},


body:
JSON.stringify(body)


});



editID=null;



clearForm();


loadData();


}





function editRecord(id){


fetch(
`${API}/records`
)

.then(res=>res.json())

.then(data=>{


const item =
data.find(
x=>x._id===id
);



document.getElementById("name").value=item.name;


document.getElementById("sponsor").value=item.sponsor;


document.getElementById("code").value=item.code;


document.getElementById("gen").value=item.gen;


document.getElementById("pin").value=item.pin;



editID=id;



});



}





async function deleteRecord(id){



if(!confirm("Delete this data?"))
return;




await fetch(
`${API}/delete-record/${id}`,
{

method:"DELETE"

});



loadData();


}







function clearForm(){


document.getElementById("name").value="";

document.getElementById("sponsor").value="";

document.getElementById("code").value="";

document.getElementById("gen").value="";

document.getElementById("pin").value="";


}







async function searchData(){



const q =
document.getElementById("search").value;



const res =
await fetch(
`${API}/search?q=${q}`
);



const data =
await res.json();



const table =
document.getElementById("recordsTable");



table.innerHTML="";



data.forEach(item=>{


table.innerHTML += `

<tr>

<td>${item.name}</td>

<td>${item.sponsor}</td>

<td>${item.code}</td>

<td>${item.gen}</td>

<td>${item.pin}</td>


<td></td>


</tr>


`;

});


}





document
.getElementById("search")
.addEventListener(
"keyup",
searchData
);






function logout(){

localStorage.clear();

window.location.href =
"login.html";

}





loadData();