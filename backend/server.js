require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const Record = require("./models/Record");
const Admin = require("./models/Admin");


const app = express();


// ======================
// MIDDLEWARE
// ======================

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({
    extended:true
}));


// ======================
// MONGODB
// ======================

mongoose.connect(process.env.MONGO_URI)

.then(()=>{

console.log("MongoDB Connected");

})

.catch(err=>{

console.log(err);

});



// ======================
// FRONTEND
// ======================

app.use(
express.static(
path.join(__dirname,"frontend")
)
);


app.get("/",(req,res)=>{

res.sendFile(
path.join(
__dirname,
"frontend",
"login.html"
)
);

});




// ======================
// CREATE ADMIN
// ======================

app.get("/create-admin",async(req,res)=>{

try{


const exists =
await Admin.findOne({
username:"admin"
});


if(exists){

return res.json({
message:"Admin already exists"
});

}



const admin =
new Admin({

username:"admin",

password:"admin123"

});


await admin.save();



res.json({

message:"Admin created"

});


}catch(error){

res.status(500).json({

message:error.message

});

}


});




// ======================
// LOGIN
// ======================


app.post("/login",async(req,res)=>{


try{


const {
username,
password
}=req.body;



const admin =
await Admin.findOne({
username
});



if(!admin){

return res.status(404).json({

message:"Admin not found"

});

}



if(admin.password !== password){


return res.status(400).json({

message:"Wrong password"

});


}



res.json({

message:"Login success",

admin

});



}catch(error){

res.status(500).json({

message:error.message

});

}


});





// ======================
// ADD RECORD
// ======================


app.post("/add-record",async(req,res)=>{


try{


const {
name,
sponsor,
code,
gen,
pin

}=req.body;



const record =
new Record({

name,
sponsor,
code,
gen,
pin

});



await record.save();



res.json({

message:"Record Added"

});



}catch(error){


res.status(500).json({

message:error.message

});


}


});





// ======================
// GET RECORDS
// ======================


app.get("/records",async(req,res)=>{


try{


const records =
await Record.find()
.sort({
createdAt:-1
});



res.json(records);



}catch(error){


res.status(500).json({

message:error.message

});


}


});





// ======================
// SEARCH
// ======================


app.get("/search",async(req,res)=>{


try{


const q=req.query.q;



const data =
await Record.find({

$or:[

{name:{
$regex:q,
$options:"i"
}},


{sponsor:{
$regex:q,
$options:"i"
}},


{code:{
$regex:q,
$options:"i"
}},


{gen:{
$regex:q,
$options:"i"
}},


{pin:{
$regex:q,
$options:"i"
}}


]


});



res.json(data);



}catch(error){


res.status(500).json({

message:error.message

});


}


});





// ======================
// SERVER
// ======================


const PORT =
process.env.PORT || 5000;



app.listen(PORT,()=>{


console.log(
`Server running on ${PORT}`
);


});