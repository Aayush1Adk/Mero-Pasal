require('dotenv').config();
const express = require('express');
const multer = require('multer');
const cors = require("cors");

const catagoryRoute = require('./Router/CatagoryRoute');
const productRoute = require('./Router/ProductRoute');
const app = express()

app.use(express.json());
app.use(cors()); 
app.use("/catagory", catagoryRoute);
app.use("/product", productRoute);

module.exports = app;