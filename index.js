/**
 * Create Express server, listen on port 3000, and run in development mode
 */
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
require("dotenv/config");

const PORT = process.env.PORT || 3000;
// const NODE_ENV = process.env.NODE_ENV || "development";

//Middlewares
app.use(cors());
app.use(bodyParser.json({limit: '50mb'}));

const apiRoute = require('./routes/posts');
app.use('/api/v1/cocktails', apiRoute);

mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true },
    () => console.log("Connected to DB")
);

app.set("port", PORT);

app.listen(PORT, () => {
    console.log(
        `Express Server started on Port ${app.get(
            "port"
        )} | Environment : ${app.get("env")}`
    );
});