// index.cjs
const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const { json } = require("body-parser");
const Router = require("./src/routers/admin");

app.use(cors());
app.use(json());
app.use("/admin", Router);

const uri = "mongodb+srv://dinaraazamatovna03:jWz4qupT0HYV216U@omborcomtech.ro8nq2q.mongodb.net/?retryWrites=true&w=majority&appName=omborcomtech";
async function connect() {
    try {
        await mongoose.connect(uri);
        console.log("Connected to MongoDB successfully");
    } catch (error) {
        console.log(error);
    }
}
connect();



const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
