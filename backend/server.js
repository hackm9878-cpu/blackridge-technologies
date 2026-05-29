const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");
const path = require("path");

const User = require("./models/User");
const Staff = require("./models/Staff");
const Product = require("./models/Product");
const Sale = require("./models/Sale");
const Customer = require("./models/Customer");
const Notification = require("./models/Notification");

const app = express();

app.use(cors());
app.use(express.json());

app.use(
    "/uploads",
    express.static("uploads")
);



// =====================================
// MONGODB
// =====================================

mongoose.connect(
"mongodb+srv://hackm9878_db_user:cjs8tLlvBr79UYkg@blackridge.vmwgivt.mongodb.net/blackridge?retryWrites=true&w=majority"
)
.then(()=>{

console.log(
"MongoDB Atlas Connected"
);

})
.catch((err)=>{

console.log(err);

});

// =====================================
// MULTER STORAGE
// =====================================

const storage =
multer.diskStorage({

    destination:(req,file,cb)=>{

        cb(null,"uploads/");

    },

    filename:(req,file,cb)=>{

        cb(

            null,

            Date.now() +
            path.extname(
                file.originalname
            )

        );

    }

});



const upload =
multer({
    storage
});



// =====================================
// CREATE ADMIN
// =====================================

app.get(
    "/create-admin",
    async(req,res)=>{

        try{

            const admin =
            await User.findOne({

                username:"admin"

            });

            if(admin){

                return res.json({

                    message:
                    "Admin Already Exists"

                });

            }

            const newAdmin =
            new User({

                name:"Black Ridge Admin",

                username:"admin",

                password:"admin123",

                role:"admin"

            });

            await newAdmin.save();

            res.json({

                message:
                "Admin Created"

            });

        }catch(error){

            console.log(error);

            res.status(500).json({

                message:
                "Server Error"

            });

        }

});



// =====================================
// LOGIN
// =====================================

app.post(
    "/login",
    async(req,res)=>{

        try{

            const {
                username,
                password
            } = req.body;



            // ADMIN
            let user =
            await User.findOne({
                username
            });



            if(user){

                if(user.password !== password){

                    return res.status(400).json({

                        message:
                        "Wrong Password"

                    });

                }

                return res.json({

                    user

                });

            }



            // STAFF
            let staff =
            await Staff.findOne({
                username
            });



            if(staff){

                if(staff.password !== password){

                    return res.status(400).json({

                        message:
                        "Wrong Password"

                    });

                }

                return res.json({

                    user:staff

                });

            }



            res.status(404).json({

                message:
                "User Not Found"

            });

        }catch(error){

            console.log(error);

            res.status(500).json({

                message:
                "Server Error"

            });

        }

});



// =====================================
// ADD STAFF
// =====================================

app.post(
    "/add-staff",
    async(req,res)=>{

        try{

            const {
                name,
                username,
                password,
                state
            } = req.body;



            const exists =
            await Staff.findOne({
                username
            });



            if(exists){

                return res.status(400).json({

                    message:
                    "Username Already Exists"

                });

            }



            const staff =
            new Staff({

                name,
                username,
                password,
                state

            });



            await staff.save();



            res.json({

                message:
                "Staff Added"

            });

        }catch(error){

            console.log(error);

            res.status(500).json({

                message:
                "Server Error"

            });

        }

});



// =====================================
// GET STAFF
// =====================================

app.get(
    "/staff",
    async(req,res)=>{

        try{

            const staff =
            await Staff.find();

            res.json(staff);

        }catch(error){

            console.log(error);

            res.status(500).json({

                message:
                "Server Error"

            });

        }

});



// =====================================
// DELETE STAFF
// =====================================

app.delete(
    "/delete-staff/:id",
    async(req,res)=>{

        try{

            await Staff.findByIdAndDelete(
                req.params.id
            );

            res.json({

                message:
                "Staff Deleted"

            });

        }catch(error){

            console.log(error);

            res.status(500).json({

                message:
                "Server Error"

            });

        }

});



// =====================================
// ADD PRODUCT TO STAFF
// =====================================

app.post(
    "/assign-product",
    upload.single("image"),
    async(req,res)=>{

        try{

            const {

                staffId,
                productName,
                sellingPrice,
                costPrice,
                quantity,
                barcode

            } = req.body;



            const totalPrice =

            Number(costPrice) *
            Number(quantity);



            const product =
            new Product({

                productName,

                sellingPrice,

                costPrice,

                quantity,

                barcode,

                totalPrice,

                staffId,

                image:req.file
                ? req.file.filename
                : ""

            });



            await product.save();



            const staff =
            await Staff.findById(
                staffId
            );



            if(staff){

                staff.products.push(
                    product._id
                );

                await staff.save();

            }



            res.json({

                message:
                "Product Assigned"

            });

        }catch(error){

            console.log(error);

            res.status(500).json({

                message:
                "Server Error"

            });

        }

});



// =====================================
// STAFF PRODUCTS
// =====================================

app.get(
    "/staff-products/:id",
    async(req,res)=>{

        try{

            const products =
            await Product.find({

                staffId:req.params.id

            });

            res.json(products);

        }catch(error){

            console.log(error);

            res.status(500).json({

                message:
                "Server Error"

            });

        }

});



// =====================================
// CHECKOUT
// =====================================

app.post(
    "/checkout",
    async(req,res)=>{

        try{

            const {

                cart,
                customerName,
                customerPhone,
                amountPaid,
                discount,
                staffId,
                staffName

            } = req.body;



            let total = 0;



            for(let item of cart){

                total +=
                item.sellingPrice *
                item.qty;

            }



            // DISCOUNT
            total -= Number(discount || 0);



            // BALANCE
            const balance =
            Number(amountPaid || 0) - total;



            // SAVE SALES
            for(let item of cart){

                const sale =
                new Sale({

                    customerName,

                    customerPhone,

                    productName:
                    item.productName,

                    barcode:
                    item.barcode,

                    quantity:
                    item.qty,

                    sellingPrice:
                    item.sellingPrice,

                    amountPaid,

                    discount,

                    total,

                    balance,

                    staffId,

                    staffName,

                    receiptNumber:
                    "BR-" + Date.now()

                });



                await sale.save();



                // REDUCE STOCK
                const product =
                await Product.findById(
                    item._id
                );



                if(product){

                    product.quantity -=
                    item.qty;

                    await product.save();

                }

            }



            // SAVE CUSTOMER
            const customer =
            new Customer({

                name:
                customerName,

                phone:
                customerPhone,

                totalBought:
                total,

                amountPaid,

                balance,

                staffName,

                paymentStatus:
                balance >= 0
                ? "Paid"
                : "Not Complete"

            });



            await customer.save();



            res.json({

                message:
                "Checkout Successful"

            });

        }catch(error){

            console.log(error);

            res.status(500).json({

                message:
                "Server Error"

            });

        }

});



// =====================================
// SALES HISTORY
// =====================================

app.get(
    "/sales-history/:id",
    async(req,res)=>{

        try{

            const sales =
            await Sale.find({

                staffId:req.params.id

            }).sort({

                createdAt:-1

            });

            res.json(sales);

        }catch(error){

            console.log(error);

            res.status(500).json({

                message:
                "Server Error"

            });

        }

});



// =====================================
// COMPANY SALES
// =====================================

app.get(
    "/all-sales",
    async(req,res)=>{

        try{

            const sales =
            await Sale.find().sort({
                createdAt:-1
            });

            res.json(sales);

        }catch(error){

            console.log(error);

            res.status(500).json({

                message:
                "Server Error"

            });

        }

});



// =====================================
// CUSTOMERS
// =====================================

app.get(
    "/customers",
    async(req,res)=>{

        try{

            const customers =
            await Customer.find().sort({
                createdAt:-1
            });

            res.json(customers);

        }catch(error){

            console.log(error);

            res.status(500).json({

                message:
                "Server Error"

            });

        }

});



// =====================================
// UPDATE SETTINGS
// =====================================

app.post(
    "/update-settings",
    async(req,res)=>{

        try{

            const {
                id,
                role,
                name,
                username,
                password
            } = req.body;



            if(role === "staff"){

                const oldStaff =
                await Staff.findById(id);



                const notification =
                new Notification({

                    message:
                    `${oldStaff.name} changed account info`

                });



                await notification.save();



                await Staff.findByIdAndUpdate(
                    id,
                    {
                        name,
                        username,
                        password
                    }
                );

            }



            if(role === "admin"){

                await User.findByIdAndUpdate(
                    id,
                    {
                        name,
                        username,
                        password
                    }
                );

            }



            res.json({

                message:
                "Updated"

            });

        }catch(error){

            console.log(error);

            res.status(500).json({

                message:
                "Server Error"

            });

        }

});



// =====================================
// DAILY REPORT
// =====================================

app.get(
    "/daily-report",
    async(req,res)=>{

        try{

            const sales =
            await Sale.find();

            const products =
            await Product.find();

            const staff =
            await Staff.find();



            let totalSales = 0;

            sales.forEach(s=>{

                totalSales +=
                s.total || 0;

            });



            let remainingCapital = 0;

            products.forEach(p=>{

                remainingCapital +=

                (p.costPrice || 0) *
                (p.quantity || 0);

            });



            res.json({

                totalSales,

                totalProducts:
                products.length,

                totalStaff:
                staff.length,

                remainingCapital,

                totalTransactions:
                sales.length,

                sales

            });

        }catch(error){

            console.log(error);

            res.status(500).json({

                message:
                "Server Error"

            });

        }

});



// =====================================
// DELETE PRODUCT
// =====================================

app.delete(
    "/delete-product/:id",
    async(req,res)=>{

        try{

            await Product.findByIdAndDelete(
                req.params.id
            );

            res.json({

                message:
                "Deleted"

            });

        }catch(error){

            console.log(error);

            res.status(500).json({

                message:
                "Server Error"

            });

        }

});



// =====================================
// GET NOTIFICATIONS
// =====================================

app.get(
    "/notifications",
    async(req,res)=>{

        try{

            const notifications =
            await Notification.find();

            res.json(notifications);

        }catch(error){

            console.log(error);

            res.status(500).json({

                message:
                "Server Error"

            });

        }

});



// =====================================
// START SERVER
// =====================================

app.listen(
    5000,
    ()=>{

        console.log(
            "Server Running On Port 5000"
        );

});