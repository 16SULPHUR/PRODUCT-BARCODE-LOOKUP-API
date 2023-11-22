const ProductDetails = require("../models/productDetails");

async function addProductHandler(code,data) {

    const newProduct = new ProductDetails({
        "code" : code,
        "data" : data
    });

    await newProduct.save().then(() => {
        console.log("Product Added Successfully");
      });
}

module.exports = addProductHandler;