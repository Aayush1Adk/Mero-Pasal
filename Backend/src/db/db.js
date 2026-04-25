const mongoose = require("mongoose");

async function ConnectDB(){
    await mongoose.connect(process.env.MONGO_URI);

    console.log("DB Connected");
}

module.exports = ConnectDB;