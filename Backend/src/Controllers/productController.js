const ProductModel = require('../Models/product.model');
const {UploadImage} = require('../Services/image.service');

const validateMongoID = (id) => {
    return /^[0-9a-fA-F]{24}$/.test(id)
};


const AddProduct = async (req, res)=>{
    try {
        const data = req.body

        if(!data.title || !data.catagory || !data.Details || !data.MP || !data.SP || !req.file) {
            return res.status(400).json({ message: "All fields are required" });
        }

        if(!data.offer) {
            data.offer = false;
        }

        if(!data.Discount) {
            data.Discount = 0;
        }

        if(!data.title.trim() || !data.Details.trim()) {
            return res.status(400).json({ message: "Title and Details cannot be empty" });
        }

        if( typeof data.title !== "string" || typeof data.Details !== "string") {
            return res.status(400).json({ message: "Title and Details must be string" });
        }

        if (!validateMongoID(data.catagory))
        {
            return res.status(400).json({ message: "Invalid Catagory ID" });
        }

        const image = await UploadImage(req.file.buffer, req.file.mimetype);
        const newProduct = await ProductModel.create({
            title: data.title,
            image: image.secure_url,
            catagory: data.catagory,
            Details: data.Details,
            MP: Number(data.MP),
            SP: Number(data.SP),
            offer: data.offer,
            Discount: Number(data.Discount)
        })

        res.status(201).json({ message: "Product Created", products: newProduct })
    }
    catch (error) {
        console.log("ERROR:", error.message) 
        res.status(400).json({ message: "Product Not Created", error: error.message });
    }

}

const GetProduct = async (req, res)=>{
    try {
        const data = await ProductModel.find().populate("catagory");
        res.status(200).json(data);

    }
    catch (error) {
    res.status(400).json({message:"Product Not Found", error: error.message });
    }
}



const UpdateProduct = async (req, res)=>{
    try {
        const id = req.params.id;   
        const data = req.body;

                if(!data.title || !data.catagory || !data.Details || !data.MP || !data.SP || !req.file) {
            return res.status(400).json({ message: "All fields are required" });
        }

        if(!data.offer) {
            data.offer = false;
        }

        if(!data.Discount) {
            data.Discount = 0;
        }

        if(!data.title.trim() || !data.Details.trim()) {
            return res.status(400).json({ message: "Title and Details cannot be empty" });
        }

        if( typeof data.title !== "string" || typeof data.Details !== "string") {
            return res.status(400).json({ message: "Title and Details must be string" });
        }

        if (!validateMongoID(data.catagory))
        {
            return res.status(400).json({ message: "Invalid Catagory ID" });
        }


        const updateData = {}
        if(data.title) updateData.title = data.title;
        if(data.catagory) updateData.catagory = data.catagory;
        if(data.Details) updateData.Details = data.Details;
        if(data.MP) updateData.MP = Number(data.MP);
        if(data.SP) updateData.SP = Number(data.SP);
        if(data.offer) updateData.offer = data.offer;
        if(data.Discount) updateData.Discount = Number(data.Discount);
        if(req.file) {
            const image = await UploadImage(req.file.buffer, req.file.mimetype);
            updateData.image = image.secure_url;
        }


        const updateProduct = await ProductModel.findByIdAndUpdate(req.params.id, {
            $set: updateData
        }, {new: true})
        res.status(200).json({ message: "Product Updated", products: updateProduct })
        }
    catch (error) {
        console.log("ERROR:", error.message) 
        res.status(400).json({ message: "Product Not Updated", error: error.message });
    }
}

const DeleteProduct = async (req, res)=>{
    try{
        const id = req.params.id;
        const deleteProduct = await ProductModel.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Product Deleted", products: deleteProduct })
    }
    catch (error) {
        console.log("ERROR:", error.message) 
        res.status(400).json({ message: "Product Not Deleted", error: error.message });
    }
}

module.exports = {AddProduct, GetProduct, UpdateProduct, DeleteProduct};