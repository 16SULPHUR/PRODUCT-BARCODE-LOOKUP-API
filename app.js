const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const bodyParser = require("body-parser");
const path = require("path")
const ProductDetails = require("./models/productDetails");
const addProductHandler = require("./controllers/addProductHandler")
const cors = require("cors")
const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.set("views", path.join(__dirname, "./public"));
app.use(express.static(path.join(__dirname, "./public")));

const DB = 'mongodb+srv://akpatil51340:%40Ankit2005@cluster0.lahzobm.mongodb.net/productLookup?retryWrites=true&w=majority'
main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect(DB);
  console.log("connected to db");
}



app.get("/", async (req, res) => {

    console.log(req.query)

    addProductHandler(req, res)
    const allProducts = await ProductDetails.find()
    // res.json(allProducts)
    res.send("index", allProducts)
});

app.get("/p", async (req, res) => {

    console.log(req.query)

    // addProductHandler(req, res)
    // const allProducts = await ProductDetails.find()
    res.json({"allProducts": "pppppp"})
});

app.listen(PORT, () => {
  console.log(`Example app listening on ${PORT}`);
});
