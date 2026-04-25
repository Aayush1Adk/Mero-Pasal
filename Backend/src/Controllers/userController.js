const ProductModel = require("../Models/product.model");
const {UploadImage} = require("../Services/image.service");

const VeiwProduct = async (req, res)=>{
    try {
        const data = await ProductModel.find().select("title catagory SP offer Discount").populate("catagory");
        res.status(200).json({message:"Product Fatch Successfully",
            products: data});
    }
    catch (error) {
        res.status(400).json({message:"Product Not Fatch"});
    }
}

const ViewAllProduct = async (req, res)=>{
    try {
        const id = req.params.id;
        const data = await ProductModel.findById(req.params.id).populate("catagory");
        res.status(200).json({message:"Product Fatch Successfully",
            products: data});
    }
    catch (error) {
        res.status(400).json({message:"Product Not Fatch"});
    }
}

module.exports = {VeiwProduct, ViewAllProduct};