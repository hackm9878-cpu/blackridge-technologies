const API =
"http://localhost:5000";



// CHECK USER
const user =
JSON.parse(
localStorage.getItem("user")
);



// BLOCK STAFF
if(user.role === "staff"){

window.location.href =
"staff-dashboard.html";

}



// LOAD DASHBOARD
async function loadDashboard(){

try{

const response =
await fetch(
`${API}/dashboard`
);

const data =
await response.json();



// STATS
document.getElementById(
"totalProducts"
).innerText =
data.totalProducts;



document.getElementById(
"totalSales"
).innerText =
`₦${data.totalSales}`;



document.getElementById(
"totalStaff"
).innerText =
data.totalStaff || 0;



document.getElementById(
"lowStock"
).innerText =
data.lowStock || 0;




// PRODUCTS
const productList =
document.getElementById(
"productList"
);

productList.innerHTML = "";



data.products.forEach(product=>{

productList.innerHTML += `

<div class="product">

${
product.image
?

`<img
src="${API}/uploads/${product.image}"
width="100%">`

:

""
}

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

<p>
Staff:
${product.staffName || "Not Assigned"}
</p>

</div>

`;

});




// RECENT SALES
const recentSales =
document.getElementById(
"recentSales"
);

recentSales.innerHTML = "";



data.sales.reverse().slice(0,5).forEach(sale=>{

recentSales.innerHTML += `

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
₦${sale.sellingPrice}
</p>

<p>
Staff:
${sale.staffName || "Unknown"}
</p>

</div>

`;

});




// CHART
createChart(data.sales);


}catch(error){

console.log(error);

}

}




// ANALYTICS CHART
function createChart(sales){

const ctx =
document.getElementById(
"salesChart"
);


const labels =
sales.map(
sale => sale.productName
);


const profits =
sales.map(
sale => sale.profit || 0
);



new Chart(ctx, {

type:"bar",

data:{

labels,

datasets:[{

label:
"Business Analytics",

data:profits,

borderWidth:2

}]

},

options:{

responsive:true,

scales:{

y:{

beginAtZero:true

}

}

}

});

}




// LOGOUT
function logout(){

localStorage.removeItem(
"user"
);

window.location.href =
"login.html";

}




loadDashboard();