const express = require("express");
const dotenv = require('dotenv');
const routers = require("./routers/index.js");
const customErrorHandler = require("./middlewares/errors/customErrorHandler");
const dbConnection = require("./helpers/db/db_connection");
require('express-async-errors');
//Environment Variables 
dotenv.config({
    path: "./config/env/config.env",

});

dbConnection();

const app = express();

const PORT = process.env.PORT;

//Routers Middlewares

app.use("/api", routers);

//Error Handler
app.use(customErrorHandler);

app.listen(PORT, () => {
    console.log(`App started on ${PORT} : ${process.env.NODE_ENV}`);
});