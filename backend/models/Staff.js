const mongoose =
require("mongoose");


const staffSchema =
new mongoose.Schema({

name:String,

username:String,

password:String,

state:String,

role:{
type:String,
default:"staff"
},

products:[
{
type:mongoose.Schema.Types.ObjectId,
ref:"Product"
}
],

createdAt:{
type:Date,
default:Date.now
}

});


module.exports =
mongoose.model(
"Staff",
staffSchema
);