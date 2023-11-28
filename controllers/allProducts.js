const ProductDetails = require("../models/productDetails");

async function allProducts() {
  const usefulProductData = [];
  const allProducts = await ProductDetails.find();

  allProducts.forEach((product) => {
      const productData = {
          code: product.code,
          title: product.data.title[0],
          image: product.data.images[0],
        };
        
        usefulProductData.push(productData);
  });

  return usefulProductData;
}

module.exports = allProducts;
