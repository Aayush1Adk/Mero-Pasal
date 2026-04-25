require('dotenv').config();
const express = require('express');
const multer = require('multer');
const cors = require("cors");
const path = require('path');

const catagoryRoute = require('./Router/CatagoryRoute');
const productRoute = require('./Router/ProductRoute');
const app = express()

app.use(express.json());
app.use(cors()); 

// Serve static files from dist folder (frontend build)
app.use(express.static(path.join(__dirname, '../dist')));

app.use("/catagory", catagoryRoute);
app.use("/product", productRoute);

// Handle SPA routing - serve index.html for all non-API routes
// Only match routes that don't start with /catagory or /product
app.get(/^\/(?!catagory|product).*/, (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

module.exports = app;