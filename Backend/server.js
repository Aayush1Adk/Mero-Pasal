const app = require("./src/app.js");
const ConnectDB = require("./src/db/db.js")

ConnectDB();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});