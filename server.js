const app = require("./Backend/src/app.js");
const ConnectDB = require("./Backend/src/db/db.js")

ConnectDB();

app.listen(3000, ()=>{
    console.log("Server is running in Port 3000 ")
});