const receipt = JSON.parse(

    localStorage.getItem("receipt")

);



if(!receipt){

    alert("No Receipt");

}



// CUSTOMER
document.getElementById(
    "customerName"
).innerText =

receipt.customerName;



// PHONE
document.getElementById(
    "customerPhone"
).innerText =

receipt.customerPhone;



// DATE
document.getElementById(
    "date"
).innerText =

receipt.date;



// TIME
document.getElementById(
    "time"
).innerText =

receipt.time;



// BARCODE
document.getElementById(
    "barcode"
).innerText =

receipt.barcode;



// DISCOUNT
document.getElementById(
    "discount"
).innerText =

receipt.discount;



// TOTAL
document.getElementById(
    "total"
).innerText =

receipt.total;



// PRODUCTS
const productsList =
document.getElementById(
    "productsList"
);



receipt.products.forEach(product=>{

    const subtotal =
    product.qty *
    product.sellingPrice;



    productsList.innerHTML += `

    <div>

        <p>
        ${product.productName}
        </p>

        <p>
        Qty:
        ${product.qty}
        </p>

        <p>
        ₦${subtotal}
        </p>

    </div>

    `;

});



// WHATSAPP
function sendWhatsAppReceipt(){

    let message =

`BLACK BRIDGE TECHNOLOGIES

Customer:
${receipt.customerName}

Phone:
${receipt.customerPhone}

Date:
${receipt.date}

Time:
${receipt.time}

Total:
₦${receipt.total}`;

    

    window.open(

`https://wa.me/?text=${encodeURIComponent(message)}`,

"_blank"

);

}