require("dotenv").config();

const multer = require("multer");
const XLSX = require("xlsx");
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

const upload = multer({
    dest:"uploads/"
});

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
createdAt:1
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



app.put("/update-record/:id",async(req,res)=>{


try{


await Record.findByIdAndUpdate(
req.params.id,
req.body
);


res.json({

message:"Updated"

});


}catch(error){

res.status(500).json({

message:error.message

});

}


});





app.delete("/delete-record/:id",async(req,res)=>{


try{


await Record.findByIdAndDelete(
req.params.id
);


res.json({

message:"Deleted"

});


}catch(error){


res.status(500).json({

message:error.message

});


}


});

// ======================
// CHANGE PASSWORD
// ======================


app.put("/change-password/:id",
async(req,res)=>{


try{


const {
password
}=req.body;



await Admin.findByIdAndUpdate(

req.params.id,

{

password

}

);



res.json({

message:"Password changed successfully"

});



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

app.post("/import-excel", upload.single("file"), async(req,res)=>{

try{


const workbook = XLSX.readFile(req.file.path);


const sheet = workbook.Sheets[
workbook.SheetNames[0]
];


const data = XLSX.utils.sheet_to_json(sheet);



await Record.insertMany(data);



res.json({

message:"Excel imported successfully",

total:data.length

});


}catch(error){


res.status(500).json({

message:error.message

});


}


});

app.listen(PORT,()=>{


console.log(
`Server running on ${PORT}`
);


});