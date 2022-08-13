const ErrorHandler = require("../utils/errorHander");

module.exports = (err, req , res , next) =>{
    err.statusCode = err.statusCode || 500 ;
    err.message = err.message || "Internal Sever Error" ;

// Wrong MongoDB ID error
if(err.name === "CastError"){
    const message ='Resource Not Found. Invalid: ${err.path}';
    err = new ErrorHandler(message,400);
}


    res.status(err.statusCode).json({
        success: false,
        message: err.message,
    });
};