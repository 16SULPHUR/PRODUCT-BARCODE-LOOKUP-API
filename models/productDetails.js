const mongoose = require("mongoose");

const productDetailsSchema = new mongoose.Schema({
  code: {
    type: Number,
    unique: true
  },
  data:{
    type: Object
  }
}, { strict: false });

const ProductDetails = mongoose.model("ProductDetails", productDetailsSchema);
module.exports = ProductDetails;