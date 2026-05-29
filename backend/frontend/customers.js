const API =
"http://localhost:5000";



// =====================
// LOAD CUSTOMERS
// =====================
async function loadCustomers(){

try{

const response =
await fetch(
`${API}/customers`
);

const customers =
await response.json();



const customerList =
document.getElementById(
"customerList"
);

customerList.innerHTML = "";



customers.forEach(customer=>{

customerList.innerHTML += `

<div class="product">

<h2>
${customer.name}
</h2>

<p>
Phone:
${customer.phone}
</p>

<p>
Amount Paid:
₦${customer.amountPaid}
</p>

<p>
Balance:
₦${customer.balance}
</p>

<p>
Staff:
${customer.staffName}
</p>

<p>
Status:
${customer.paymentStatus}
</p>

</div>

`;

});

}catch(error){

console.log(error);

}

}




// =====================
// SEARCH CUSTOMER
// =====================
function searchCustomer(){

const input =
document.getElementById(
"searchCustomer"
).value.toLowerCase();



const cards =
document.querySelectorAll(
"#customerList .product"
);



cards.forEach(card=>{

const text =
card.innerText.toLowerCase();



card.style.display =
text.includes(input)
? "block"
: "none";

});

}




// =====================
// NAVIGATION
// =====================
function goDashboard(){

window.location.href =
"dashboard.html";

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




// LOAD
loadCustomers();