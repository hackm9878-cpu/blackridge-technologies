const API =
"https://blackridge.onrender.com";



const staffId =
localStorage.getItem(
"staffId"
);



// =====================
// LOAD STAFF
// =====================
async function loadStaff(){

try{

const response =
await fetch(
`${API}/staff`
);

const staff =
await response.json();


const worker =
staff.find(

s => s._id === staffId

);



if(!worker) return;



document.getElementById(
"staffInfo"
).innerHTML = `

<h2>
${worker.name}
</h2>

<p>
Username:
${worker.username}
</p>

<p>
State:
${worker.state}
</p>

`;



loadProducts();

loadSalesHistory();

}catch(error){

console.log(error);

}

}




// =====================
// TOTAL PRICE
// =====================
document.getElementById(
"quantity"
).addEventListener(
"input",
calculateTotal
);


document.getElementById(
"costPrice"
).addEventListener(
"input",
calculateTotal
);




function calculateTotal(){

const quantity =
document.getElementById(
"quantity"
).value || 0;


const costPrice =
document.getElementById(
"costPrice"
).value || 0;



const total =
quantity * costPrice;



document.getElementById(
"totalPrice"
).innerText =
`Total Price: ₦${total}`;

}




// =====================
// ADD PRODUCT
// =====================
async function addProduct(){

const formData =
new FormData();


formData.append(
"staffId",
staffId
);


formData.append(
"name",
document.getElementById(
"name"
).value
);


formData.append(
"sellingPrice",
document.getElementById(
"sellingPrice"
).value
);


formData.append(
"costPrice",
document.getElementById(
"costPrice"
).value
);


formData.append(
"quantity",
document.getElementById(
"quantity"
).value
);


formData.append(
"barcode",
document.getElementById(
"barcode"
).value
);


formData.append(
"image",
document.getElementById(
"image"
).files[0]
);




try{

const response =
await fetch(
`${API}/assign-product`,
{

method:"POST",

body:formData

});



const data =
await response.json();

alert(data.message);

loadProducts();

}catch(error){

console.log(error);

}

}




// =====================
// LOAD PRODUCTS
// =====================
async function loadProducts(){

try{

const response =
await fetch(
`${API}/staff-products/${staffId}`
);

const products =
await response.json();


const productList =
document.getElementById(
"productList"
);

productList.innerHTML = "";



products.forEach(product=>{

productList.innerHTML += `

<div class="product">

<img
src="${API}/uploads/${product.image}"
width="100%">


<h2>
${product.name}
</h2>

<p>
Barcode:
${product.barcode}
</p>

<p>
Quantity:
${product.quantity}
</p>

<p>
Selling Price:
₦${product.sellingPrice}
</p>

<p>
Total Price:
₦${product.totalPrice}
</p>


<button
onclick="
deleteProduct(
'${product._id}'
)
">

Delete Product

</button>

</div>

`;

});

}catch(error){

console.log(error);

}

}




// =====================
// DELETE PRODUCT
// =====================
async function deleteProduct(id){

try{

await fetch(
`${API}/delete-product/${id}`,
{

method:"DELETE"

});



alert(
"Product Deleted"
);


loadProducts();

}catch(error){

console.log(error);

}

}




// =====================
// SALES HISTORY
// =====================
async function loadSalesHistory(){

try{

const response =
await fetch(
`${API}/staff-sales/${staffId}`
);

const sales =
await response.json();


const salesHistory =
document.getElementById(
"salesHistory"
);

salesHistory.innerHTML = "";



sales.forEach(sale=>{

salesHistory.innerHTML += `

<div class="product">

<h2>
${sale.productName}
</h2>

<p>
Customer:
${sale.customerName}
</p>

<p>
Amount:
₦${sale.amountPaid}
</p>

<p>
Discount:
₦${sale.discount}
</p>

<p>
Date:
${new Date(
sale.createdAt
).toLocaleString()}
</p>


<button
onclick='reprintReceipt(${JSON.stringify(sale)})'>

Re-Print Receipt

</button>

</div>

`;

});

}catch(error){

console.log(error);

}

}




// =====================
// REPRINT RECEIPT
// =====================
function reprintReceipt(sale){

localStorage.setItem(
"receipt",
JSON.stringify(sale)
);

window.location.href =
"receipt.html";

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




// =====================
// LOAD PAGE
// =====================
loadStaff();