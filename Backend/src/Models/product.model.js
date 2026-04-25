const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
        trim: true
        },

    image:{
            type: String,
            required: true,
            unique: true
        },
    
    catagory: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "catagory",
            required: true
        },
    Details: {
            type: String,
            required: true,
            trim: true
        },

        MP: {
            type: Number,
            required: true,
        },
    
        SP:{
            type: Number,
            required: true,
        },
    
        offer: {
            type: Boolean
        },
    
        Discount: {
            type: Number
        },
});

const ProductModel = mongoose.model("products", ProductSchema)

module.exports = ProductModel;