const API =
"https://blackridge.onrender.com";



// =====================================
// GET USER
// =====================================

const user =
JSON.parse(
localStorage.getItem("user")
);



// =====================================
// LOGOUT
// =====================================

function logout(){

localStorage.removeItem(
"user"
);

window.location.href =
"login.html";

}



// =====================================
// NAVIGATION
// =====================================

function goDashboard(){

window.location.href =
"dashboard.html";

}

function goCustomers(){

window.location.href =
"customers.html";

}

function goSettings(){

window.location.href =
"settings.html";

}



// =====================================
// LOAD DAILY REPORT
// =====================================

async function loadDailyReport(){

try{

const res =
await fetch(

`${API}/daily-report`

);

const data =
await res.json();



document.getElementById(
"dailyReport"
).innerHTML = `

Total Sales:
₦${data.totalSales || 0}

<br><br>

Total Products:
${data.totalProducts || 0}

<br><br>

Remaining Capital:
₦${data.remainingCapital || 0}

<br><br>

Transactions:
${data.totalTransactions || 0}

`;



// UPDATE STATS
document.getElementById(
"stats"
).innerHTML = `

<div class="product">

<h2>
Total Sales
</h2>

<p>
₦${data.totalSales || 0}
</p>

</div>



<div class="product">

<h2>
Total Products
</h2>

<p>
${data.totalProducts || 0}
</p>

</div>



<div class="product">

<h2>
Remaining Capital
</h2>

<p>
₦${data.remainingCapital || 0}
</p>

</div>



<div class="product">

<h2>
Transactions
</h2>

<p>
${data.totalTransactions || 0}
</p>

</div>

`;



}catch(error){

console.log(error);

document.getElementById(
"dailyReport"
).innerHTML =

"Failed To Load Report";

}

}



// =====================================
// LOAD STAFF
// =====================================

async function loadStaff(){

try{

const res =
await fetch(

`${API}/staff`

);

const staff =
await res.json();



const staffList =
document.getElementById(
"staffList"
);

staffList.innerHTML = "";



staff.forEach(user=>{

staffList.innerHTML += `

<div class="product">

<h3>
${user.name}
</h3>

<p>
${user.username}
</p>

<p>
${user.state}
</p>

<button onclick="viewStaff('${user._id}')">

View Staff

</button>

<button onclick="deleteStaff('${user._id}')">

Delete

</button>

</div>

`;

});

}catch(error){

console.log(error);

}

}



// =====================================
// ADD STAFF
// =====================================

async function addStaff(){

const name =
document.getElementById(
"staffName"
).value;

const username =
document.getElementById(
"staffUsername"
).value;

const password =
document.getElementById(
"staffPassword"
).value;

const state =
document.getElementById(
"staffState"
).value;



try{

const res =
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

}

);



const data =
await res.json();

alert(data.message);

loadStaff();

}catch(error){

console.log(error);

}

}



// =====================================
// DELETE STAFF
// =====================================

async function deleteStaff(id){

if(!confirm(
"Delete Staff?"
)) return;



await fetch(

`${API}/delete-staff/${id}`,

{
method:"DELETE"
}

);

loadStaff();

}



// =====================================
// VIEW STAFF
// =====================================

function viewStaff(id){

localStorage.setItem(
"viewStaffId",
id
);

window.location.href =
"staff-details.html";

}



// =====================================
// LOAD SALES HISTORY
// =====================================

async function loadSalesHistory(){

try{

const res =
await fetch(

`${API}/all-sales`

);

const sales =
await res.json();



const history =
document.getElementById(
"salesHistory"
);

history.innerHTML = "";



sales.forEach(sale=>{

history.innerHTML += `

<div class="product">

<h3>
${sale.productName || ""}
</h3>

<p>
Customer:
${sale.customerName || ""}
</p>

<p>
Phone:
${sale.customerPhone || ""}
</p>

<p>
Total:
₦${sale.total || 0}
</p>

<p>
Date:
${new Date(
sale.createdAt
).toLocaleDateString()}
</p>

<p>
Time:
${new Date(
sale.createdAt
).toLocaleTimeString()}
</p>

<button onclick='reprintReceipt(${JSON.stringify(sale)})'>

Reprint Receipt

</button>

</div>

`;

});

}catch(error){

console.log(error);

document.getElementById(
"salesHistory"
).innerHTML =

"Failed To Load History";

}

}



// =====================================
// SEARCH RECEIPTS
// =====================================

function searchReceipts(){

const input =
document.getElementById(
"receiptSearch"
).value.toLowerCase();



const cards =
document.querySelectorAll(
"#salesHistory .product"
);



cards.forEach(card=>{

if(

card.innerText
.toLowerCase()
.includes(input)

){

card.style.display =
"block";

}else{

card.style.display =
"none";

}

});

}



// =====================================
// REPRINT RECEIPT
// =====================================

function reprintReceipt(sale){

const receipt = {

customerName:
sale.customerName,

customerPhone:
sale.customerPhone,

date:
new Date(
sale.createdAt
).toLocaleDateString(),

time:
new Date(
sale.createdAt
).toLocaleTimeString(),

discount:
sale.discount || 0,

barcode:
sale.barcode || "",

total:
sale.total || 0,

products:[

{

productName:
sale.productName,

qty:
sale.quantity,

sellingPrice:
sale.sellingPrice

}

]

};



localStorage.setItem(

"receipt",

JSON.stringify(receipt)

);



window.open(

"receipt.html",
"_blank"

);

}



// =====================================
// NOTIFICATIONS
// =====================================

async function toggleNotifications(){

const box =
document.getElementById(
"notifications"
);



if(box.style.display === "none"){

box.style.display =
"block";

}else{

box.style.display =
"none";

}



const res =
await fetch(

`${API}/notifications`

);

const data =
await res.json();



box.innerHTML = "";



data.forEach(n=>{

box.innerHTML += `

<div class="product">

${n.message}

</div>

`;

});

}



// =====================================
// LOAD EVERYTHING
// =====================================

loadDailyReport();

loadStaff();

loadSalesHistory();