const mongoose = require("mongoose");

const recordSchema = new mongoose.Schema({
    name: String,
    sponsors: String,
    code: String,
    gen: String,
    pin: String,
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Record", recordSchema);