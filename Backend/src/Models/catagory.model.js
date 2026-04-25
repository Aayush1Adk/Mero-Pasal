const mongoose = require("mongoose");

const CatagorySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },

});

const CatagoryModel = mongoose.model("catagory", CatagorySchema)

module.exports = CatagoryModel;

