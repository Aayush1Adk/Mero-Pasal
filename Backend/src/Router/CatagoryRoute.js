const express = require("express");

const router = express.Router();

const {AddCatagory, GetCatagory, updataCatagory, DeleteCatagory} = require("../Controllers/catagoryController");

router.post("/Add-Catagory", AddCatagory);
router.get("/Get-Catagory", GetCatagory);
router.patch("/Update-Catagory/:id", updataCatagory);
router.delete("/Delete-Catagory/:id", DeleteCatagory);


module.exports = router;