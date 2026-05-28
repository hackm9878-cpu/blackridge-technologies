const mongoose =
require("mongoose");


const customerSchema =
new mongoose.Schema({

name:String,

phone:String,

totalBought:Number,

amountPaid:Number,

balance:Number,

staffName:String,

paymentStatus:String,

createdAt:{
type:Date,
default:Date.now
}

});


module.exports =
mongoose.model(
"Customer",
customerSchema
);