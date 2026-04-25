const CatagoryModel = require('../Models/catagory.model');

const validateMongoID = (id) => {

    return /^[0-9a-fA-F]{24}$/.test(id)
};


const AddCatagory = async (req, res)=>{
    try {
        const data = req.body

        if(!data.title) {
            return res.status(400).json({ message: "Title is required" });
        }
        if(!data.title.trim() || typeof data.title !== "string") {
            return res.status(400).json({ message: "Title cannot be empty and has to be string" });
        }

        await CatagoryModel.create({
            title: data.title
        })
        res.status(201).json({message:"Catagory Created",});
    }
    catch (error) {
        res.status(400).json({message:"Catagory Not Created"});
    }
}

const GetCatagory = async (req, res)=>{
    try {
        const catagory = await CatagoryModel.find();
        res.status(200).json({message:"Catagory Fatch Successfully",
            catagory: catagory});
    }  
    catch (error) {
        res.status(400).json({message:"Catagory Not Fatch"});
    }
}

const updataCatagory = async (req, res)=>{
    try {
        const id = req.params.id;
        const data = req.body;

        if(!data.title) {
            return res.status(400).json({ message: "Title is required" });
        }

        if(!data.title.trim() || typeof data.title !== "string") {
            return res.status(400).json({ message: "Title cannot be empty and has to be string" });
        }

        if(!validateMongoID(id)){
            return res.status(400).json({ message: "Invalid Catagory ID" });
        }

        const update = await CatagoryModel.findByIdAndUpdate(req.params.id,{$set : data},{new: true});
        res.status(200).json({message:"Catagory Update Successfully",
            catagory: update});
    }
    catch (error) {
        res.status(400).json({message:"Catagory Not Update"});
    }
}

const DeleteCatagory = async (req, res)=>{
    try {
        const id = req.params.id;
        await CatagoryModel.findByIdAndDelete(req.params.id);
        res.status(200).json({message:"Catagory Delete Successfully"});
    }
    catch (error) {
        res.status(400).json({message:"Catagory Not Delete"});
    }
}


module.exports = {AddCatagory, GetCatagory, updataCatagory, DeleteCatagory};