const mongoose = require("mongoose");

const productDetailsSchema = new mongoose.Schema({
  code: {
    type: Number,
    unique: true
  }
});

const ProductDetails = mongoose.model("ProductDetails", productDetailsSchema);
module.exports = ProductDetails;