const express = require("express");
const multer = require('multer');
const {AddProduct, GetProduct, UpdateProduct, DeleteProduct} = require('../Controllers/productController');
const {VeiwProduct, ViewAllProduct} = require('../Controllers/userController');
const router = express.Router();

const uploadin = multer({ storage: multer.memoryStorage() });

router.post("/Add-Product", uploadin.single("image"), AddProduct);
router.get("/Get-Product", GetProduct);
router.patch("/Update-Product/:id", uploadin.single("image"), UpdateProduct);
router.delete("/Delete-Product/:id", DeleteProduct);
router.get("/ViewProduct", VeiwProduct);
router.get("/ViewAllProduct/:id", ViewAllProduct);



module.exports = router;