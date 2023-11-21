const ProductDetails = require("../models/productDetails");

async function addProductHandler(req, res) {

    const newProduct = new ProductDetails({
        "code" : req.query.q
    });

    await newProduct.save().then(() => {
        console.log("Product Added Successfully");
      });
}

module.exports = addProductHandler;