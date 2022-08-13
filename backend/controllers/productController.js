const Product = require("../models/productModel");
const ErrorHander = require("../utils/errorHander");
const catckAsyncErrors =require("../middleware/catchAsyncErrors")

// Product Creation Admin
exports.createProduct = catckAsyncErrors(async (req, res, next) => {

    const product = await Product.create(req.body);

    res.status(201).json({
        success: true,
        product,
      });
});

// get all products
exports.getAllProducts =catckAsyncErrors(async(req, res)=>{
    const products = await Product.find(); 
    res.status(200).json({success: true,
        products})

});

//Get Product Details
exports.getProductDetails = catckAsyncErrors( async(req, res, next) => {
    const product = await Product.findById(req.params.id);

    if(!product) {
        return next(new ErrorHander("Product Not Found",404));
    }

    res.status(200).json({
        success: true,
        product,
    });
});

//Update Product -- admin
exports.updateProduct =catckAsyncErrors(async(req, res, next) => {
    let product = await Product.findById(req.params.id);

    if(!product) {
        return next(new ErrorHander("Product Not Found",404));
    }

    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new:true,
        runValidators:true,
        useFindAndModify:false
    });

    res.status(200).json({
        success:true,
        product
    })
});

//Delete Product

exports.deleteProduct =catckAsyncErrors(async(req, res, next) =>{
    const product = await Product.findById(req.params.id);

    if(!product) {
        return next(new ErrorHander("Product Not Found",404));
    }

    await product.remove();
    res.status(200).json({
        success: true,
        message: "Product Deleted Successfully"
    })
});
