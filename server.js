const express = require("express");
const dotenv = require('dotenv');
const routers = require("./routers/index.js");
const dbConnection = require("./helpers/db/db_connection");
//Environment Variables 
dotenv.config({
    path: "./config/env/config.env",

});

dbConnection();

const app = express();

const PORT = process.env.PORT;

//Routers Middlewares

app.use("/api", routers);




app.listen(PORT, () => {
    console.log(`App started on ${PORT} : ${process.env.NODE_ENV}`);
});