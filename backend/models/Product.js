const mongoose =
require("mongoose");


const productSchema =
new mongoose.Schema({

name:String,

sellingPrice:Number,

costPrice:Number,

totalPrice:Number,

quantity:Number,

barcode:String,

image:String,

staffId:String,

createdAt:{
type:Date,
default:Date.now
}

});


module.exports =
mongoose.model(
"Product",
productSchema
);