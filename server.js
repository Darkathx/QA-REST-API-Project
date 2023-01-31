const express = require("express");
const dotenv = require('dotenv');
const routers = require("./routers/index.js");
const customErrorHandler = require("./middlewares/errors/customErrorHandler");
const dbConnection = require("./helpers/db/db_connection");
//const path = require("path");
require('express-async-errors');
//Environment Variables 
dotenv.config({
    path: "./config/env/config.env",

});

dbConnection();

const app = express();

//express body middleware
app.use(express.json());

const PORT = process.env.PORT;

//Routers Middlewares

app.use("/api", routers);

//Error Handler
app.use(customErrorHandler);

//Static Files
app.use(express.static("public"));

app.listen(PORT, () => {
    console.log(`App started on ${PORT} : ${process.env.NODE_ENV}`);
});