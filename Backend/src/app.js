require('dotenv').config();
const express = require('express');
const multer = require('multer');
const cors = require("cors");

const catagoryRoute = require('./Router/CatagoryRoute');
const productRoute = require('./Router/ProductRoute');
const app = express()

app.use(express.json());
app.use(cors()); 

app.use(cors({
    origin: "https://mero-pasal-gamma.vercel.app", // Your Vercel URL
    methods: ["GET", "POST", "PATCH", "DELETE"],
    credentials: true
}));

// Root route
app.get('/', (req, res) => {
  res.json({ message: 'Mero Pasal API is running', status: 'success' });
});

app.use("/catagory", catagoryRoute);
app.use("/product", productRoute);

module.exports = app;