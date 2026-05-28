const mongoose =
require("mongoose");


const saleSchema =
new mongoose.Schema({

customerName:String,

customerPhone:String,

productName:String,

barcode:String,

quantity:Number,

amountPaid:Number,

discount:Number,

total:Number,

balance:Number,

staffId:String,

staffName:String,

receiptNumber:String,

createdAt:{
type:Date,
default:Date.now
}

});


module.exports =
mongoose.model(
"Sale",
saleSchema
);