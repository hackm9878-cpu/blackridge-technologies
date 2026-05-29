const API =
"https://blackridge-technologies-1.onrender.com";

// =====================
// SEARCH MY RECEIPTS
// =====================
function searchMyReceipts(){

const input =
document.getElementById(
"staffReceiptSearch"
).value.toLowerCase();



const cards =
document.querySelectorAll(
"#salesHistory .product"
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

const user =
JSON.parse(
localStorage.getItem("user")
);



// BLOCK ADMIN
if(user.role === "admin"){

window.location.href =
"dashboard.html";

}



let cart = [];



// =====================
// LOAD PRODUCTS
// =====================
async function loadProducts(){

try{

const response =
await fetch(
`${API}/staff-products/${user._id}`
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
Price:
₦${product.sellingPrice}
</p>


<button
onclick='addToCart(${JSON.stringify(product)})'>

Add To Cart

</button>

</div>

`;

});

}catch(error){

console.log(error);

}

}




// =====================
// ADD TO CART
// =====================
function addToCart(product){

const exists =
cart.find(

item =>
item._id === product._id

);



if(exists){

exists.quantity += 1;

}else{

cart.push({

...product,
quantity:1

});

}



renderCart();

}




// =====================
// RENDER CART
// =====================
function renderCart(){

const cartItems =
document.getElementById(
"cartItems"
);

cartItems.innerHTML = "";



let total = 0;



cart.forEach(item=>{

total +=
item.sellingPrice *
item.quantity;



cartItems.innerHTML += `

<div class="product">

<h2>
${item.name}
</h2>

<p>
₦${item.sellingPrice}
</p>

<p>
Quantity:
${item.quantity}
</p>

<button
onclick="increaseQty('${item._id}')">

+

</button>


<button
onclick="decreaseQty('${item._id}')">

-

</button>

</div>

`;

});



// DISCOUNT
const discount =
Number(
document.getElementById(
"discount"
).value || 0
);



total -= discount;



document.getElementById(
"cartTotal"
).innerText =
`Total: ₦${total}`;



const amountPaid =
Number(
document.getElementById(
"amountPaid"
).value || 0
);



const balance =
amountPaid - total;



document.getElementById(
"balance"
).innerText =
`Balance: ₦${balance}`;

}




// =====================
// INCREASE QTY
// =====================
function increaseQty(id){

const item =
cart.find(

i => i._id === id

);


item.quantity++;

renderCart();

}




// =====================
// DECREASE QTY
// =====================
function decreaseQty(id){

const item =
cart.find(

i => i._id === id

);


if(item.quantity > 1){

item.quantity--;

}else{

cart =
cart.filter(
i => i._id !== id
);

}



renderCart();

}




// =====================
// CHECKOUT
// =====================
async function checkout(){

const customerName =
document.getElementById(
"customerName"
).value;


const customerPhone =
document.getElementById(
"customerPhone"
).value;


const discount =
document.getElementById(
"discount"
).value;


const amountPaid =
document.getElementById(
"amountPaid"
).value;




try{

const response =
await fetch(
`${API}/checkout`,
{

method:"POST",

headers:{
"Content-Type":
"application/json"
},

body:JSON.stringify({

cart,

customerName,

customerPhone,

discount,

amountPaid,

staffId:user._id,

staffName:user.name

})

});



const data =
await response.json();

alert(data.message);



// SAVE RECEIPT
localStorage.setItem(
"receipt",
JSON.stringify({

customerName,
customerPhone,
discount,
amountPaid,
staffName:user.name,
cart

})

);



// CLEAR CART
cart = [];

renderCart();



// OPEN RECEIPT
window.location.href =
"receipt.html";



loadProducts();

loadSalesHistory();

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
`${API}/staff-sales/${user._id}`
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
// SETTINGS
// =====================
function goSettings(){

window.location.href =
"settings.html";

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




// LIVE TOTAL UPDATE
document.getElementById(
"discount"
).addEventListener(
"input",
renderCart
);


document.getElementById(
"amountPaid"
).addEventListener(
"input",
renderCart
);




// LOAD
loadProducts();

loadSalesHistory();

// =====================
// BARCODE AUTO CART
// =====================
document.getElementById(
"barcodeInput"
).addEventListener(
"change",
barcodeSell
);




async function barcodeSell(){

const code =
document.getElementById(
"barcodeInput"
).value;



try{

const response =
await fetch(
`${API}/staff-products/${user._id}`
);

const products =
await response.json();



const found =
products.find(

p => p.barcode === code

);



if(found){

addToCart(found);

document.getElementById(
"barcodeInput"
).value = "";

}

}catch(error){

console.log(error);

}

}