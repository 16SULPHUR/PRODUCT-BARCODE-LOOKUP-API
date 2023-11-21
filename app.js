const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const bodyParser = require("body-parser");
const ProductDetails = require("./models/productDetails");
const addProductHandler = require("./controllers/addProductHandler")
const app = express();
// const PORT = process.env.PORT;
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

dotenv.config({
  path : "./data/config.env"
});


const DB = 'mongodb+srv://akpatil51340:%40Ankit2005@cluster0.lahzobm.mongodb.net/productLookup?retryWrites=true&w=majority'
main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect(DB);
  console.log("connected to db");
}



app.get("/", async (req, res) => {

    console.log(req.body)

    // addProductHandler(req, res)
    const allProducts = await ProductDetails.find()
    res.json(allProducts)
    // res.json("HHHHHH")
});

app.listen(PORT, () => {
  console.log(`Example app listening on ${PORT}`);
});
