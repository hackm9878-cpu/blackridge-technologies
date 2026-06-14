require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const multer = require("multer");
const XLSX = require("xlsx");

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

app.use(express.static(
path.join(__dirname,"frontend")
));


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


});



// ======================
// LOGIN
// ======================


app.post("/login",async(req,res)=>{


try{


const admin =
await Admin.findOne({

username:req.body.username

});


if(!admin){

return res.status(404).json({

message:"Admin not found"

});

}



if(admin.password !== req.body.password){

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


const record =
new Record(req.body);


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
// GET DATA
// ======================


app.get("/records",async(req,res)=>{


const data =
await Record.find()
.sort({
createdAt:1
});


res.json(data);


});




// ======================
// SEARCH
// ======================


app.get("/search",async(req,res)=>{


const q =
req.query.q;


const data =
await Record.find({

$or:[

{name:{$regex:q,$options:"i"}},

{sponsor:{$regex:q,$options:"i"}},

{code:{$regex:q,$options:"i"}},

{gen:{$regex:q,$options:"i"}},

{pin:{$regex:q,$options:"i"}}


]


});


res.json(data);


});





// ======================
// EDIT UPDATE
// ======================


app.put("/update-record/:id",async(req,res)=>{


try{


await Record.findByIdAndUpdate(

req.params.id,

req.body

);


res.json({

message:"Updated successfully"

});


}catch(error){


res.status(500).json({

message:error.message

});


}


});






// ======================
// DELETE
// ======================


app.delete("/delete-record/:id",async(req,res)=>{


await Record.findByIdAndDelete(
req.params.id
);


res.json({

message:"Deleted"

});


});






// ======================
// CLEAR ALL
// ======================


app.delete("/clear-records",async(req,res)=>{


await Record.deleteMany({});


res.json({

message:"All data cleared"

});


});







// ======================
// CHANGE PASSWORD
// ======================


app.put("/change-password/:id",async(req,res)=>{


await Admin.findByIdAndUpdate(

req.params.id,

{

password:req.body.password

}

);


res.json({

message:"Password changed"

});


});







// ======================
// EXCEL UPLOAD
// ======================


app.post(
"/upload-excel",
upload.single("file"),

async(req,res)=>{


try{


const workbook =
XLSX.readFile(req.file.path);



const sheet =
workbook.Sheets[workbook.SheetNames[0]];



const rows =
XLSX.utils.sheet_to_json(sheet);




for(const row of rows){


await Record.create({

name:row.Name || "",

code:row.Code || "",

pin:row.Pin || "",

sponsor:
row["Suponsor ID"] || "",

gen:
row.GEN || ""

});


}



res.json({

message:"Excel uploaded",

total:rows.length

});



}catch(error){


res.status(500).json({

message:error.message

});


}



});






// ======================
// SERVER START
// ======================


const PORT =
process.env.PORT || 5000;


app.listen(PORT,"0.0.0.0",()=>{


console.log(

`Server running on port ${PORT}`

);


});