const mongoose = require("mongoose");

const productDetailsSchema = new mongoose.Schema({
  code: {
    type: Number,
    unique: true
  },
  title:{
    type: String
  },
  description:{
    type: String
  },
  rating:{
    type: String
  },
  images:{
    type: Array
  }
});

const ProductDetails = mongoose.model("ProductDetails", productDetailsSchema);
module.exports = ProductDetails;