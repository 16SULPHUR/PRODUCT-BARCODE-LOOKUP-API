const ProductDetails = require("../models/productDetails");

async function addProductHandler(code,data) {

    const newProduct = new ProductDetails({
        "code" : code,
        "data" : data
    });

    const savedProduct = await newProduct.save()
    // .then(() => {
    //     console.log("Product Added Successfully");
    //   });

   
    console.log(savedProduct)
      return savedProduct
}

module.exports = addProductHandler;
























