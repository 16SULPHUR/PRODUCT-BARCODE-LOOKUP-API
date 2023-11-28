const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const bodyParser = require("body-parser");
const path = require("path");
const ProductDetails = require("./models/productDetails");
const addProductHandler = require("./controllers/addProductHandler");
const axios = require("axios");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 5000;

const firstTry = require("./controllers/APIs/firstAPI");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.set("views", path.join(__dirname, "./public"));
app.use(express.static(path.join(__dirname, "./public")));

const DB =
  "mongodb+srv://akpatil51340:%40Ankit2005@cluster0.lahzobm.mongodb.net/productLookup?retryWrites=true&w=majority";
main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect(DB);
  console.log("connected to db");
}



app.get("/", async (req, res) => {
  console.log(req.query);

  // addProductHandler(code,req, res);
  const allProducts = await ProductDetails.find();
  // res.json(allProducts)
  res.send("index");
});

app.get("/p", async (req, res) => {
  console.log(req.query);

  // addProductHandler(code,req, res);
  const allProducts = await ProductDetails.find();
  res.json(allProducts);
});

app.get("/s", async (req, res) => {

  let usefulData = {
    title: [],
    description: [],
    images: [],
    stores: [],
    brand: [],
    size: [],
    alias: [],
    category: [],
    features : [],
    other: {
      ingredients: [],
      serving_per_container: [],
      calories: [],
      fat: [],
      sodium: [],
      potassium: [],
      carbohydrate: [],
      fiber: [],
      sugar: [],
      protein: [],
      author: [],
      publisher: [],
      pages: [],
      alcohol: [],
    },
  };

  
  // try ZERO 00000000000000
  const match = await ProductDetails.find({ code: req.query.code });

  // console.log(match)
  if (match[0]) {
    console.log("MATCH FOUND");
    res.json(match[0]);
  } else {
    console.log("NO MATCH");
    firstTry(req.query.code, usefulData, req, res);
  }
});

app.listen(PORT, () => {
  console.log(`Example app listening on ${PORT}`);
});
