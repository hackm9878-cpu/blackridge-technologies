require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
const Admin = require("./models/Admin");

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

app.post("/login", async (req, res) => {

    try {

        const { username, password } = req.body;

        if (!username || !password) {

            return res.status(400).json({
                message: "Username and password required"
            });

        }

        const admin = await Admin.findOne({
            username
        });

        if (!admin) {

            return res.status(404).json({
                message: "Admin not found"
            });

        }

        if (admin.password !== password) {

            return res.status(400).json({
                message: "Wrong password"
            });

        }

        res.json({
            message: "Login successful",
            admin
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});