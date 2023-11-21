const ProductDetails = require("../models/productDetails");

async function addProductHandler(req, res) {

    const newProduct = new ProductDetails({
        "code" : req.query.code,
        "title": req.query.title,
        "description": req.query.description,
        "rating": req.query.rating
    });

    await newProduct.save().then(() => {
        console.log("Product Added Successfully");
      });
}

module.exports = addProductHandler;