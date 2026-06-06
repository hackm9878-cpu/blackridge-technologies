require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const Admin = require("./models/Admin");

const app = express();

// ======================
// MIDDLEWARE
// ======================

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ======================
// MONGODB CONNECTION
// ======================

mongoose.connect(process.env.MONGO_URI)

.then(() => {

    console.log("MongoDB Connected");

})

.catch((err) => {

    console.log("MongoDB Error:", err);

});

// ======================
// HOME
// ======================

const path = require("path");

// Serve frontend folder
app.use(express.static(path.join(__dirname, "frontend")));

// Default route to login page
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "frontend", "login.html"));
});

// ======================
// CREATE ADMIN
// ======================

app.get("/create-admin", async (req, res) => {

    try {

        const adminExists = await Admin.findOne({
            username: "admin"
        });

        if (adminExists) {

            return res.json({
                message: "Admin already exists"
            });

        }

        const admin = new Admin({

            username: "admin",
            password: "admin123"

        });

        await admin.save();

        res.json({
            message: "Admin created successfully"
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});

// ======================
// LOGIN
// ======================

app.post("/login", async (req, res) => {

    try {

        const { username, password } = req.body;

        if (!username || !password) {

            return res.status(400).json({
                message: "Username and Password Required"
            });

        }

        const admin = await Admin.findOne({
            username
        });

        if (!admin) {

            return res.status(404).json({
                message: "Admin Not Found"
            });

        }

        if (admin.password !== password) {

            return res.status(400).json({
                message: "Wrong Password"
            });

        }

        res.json({

            message: "Login Successful",

            admin: {

                _id: admin._id,
                username: admin.username

            }

        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});

// ======================
// START SERVER
// ======================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {

    console.log(
        `Server Running On Port ${PORT}`
    );

});