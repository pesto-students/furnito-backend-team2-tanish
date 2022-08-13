const express = require("express");
const app = express();

const errorMiddleware = require("./middleware/error");

app.use(express.json());
//Routes Import

const product = require("./routes/productRoute");


app.use("/api/v1",product);

//MiddleWare For Errors
app.use(errorMiddleware);






module.exports = app;
