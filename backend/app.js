const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
var cors =require("cors");
const errorMiddleware = require("./middleware/error");

app.use(express.json());
app.use(cookieParser());
app.use(cors());
//Routes Import

const product = require("./routes/productRoute");
const user =require("./routes/userRoute");
const order =require("./routes/orderRoute");

app.use("/api/v1",product);
app.use("/api/v1",user);
app.use("/api/v1",order);

//MiddleWare For Errors
app.use(errorMiddleware);






module.exports = app;
