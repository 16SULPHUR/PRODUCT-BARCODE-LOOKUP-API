const ProductDetails = require("../models/productDetails");

async function addProductHandler(data,req, res) {

    const newProduct = new ProductDetails({
        data
    });

    await newProduct.save().then(() => {
        console.log("Product Added Successfully");
      });
}

module.exports = addProductHandler;