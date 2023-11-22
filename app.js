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

  // try ZERO 00000000000000
  const match = await ProductDetails.find({code : req.query.code})

  // console.log(match)
  if(match[0]){
    console.log("MATCH FOUND")
    res.json(match[0])
  }else{
    console.log("NO MATCH")
    firstTry(req.query.code,req,res)
  }
  
});

app.listen(PORT, () => {
  console.log(`Example app listening on ${PORT}`);
});


async function firstTry(code,req,res){
  try {
    // FIRST TRY
    console.log("TRY 111111111111111111");
    const response = await axios.get(
      "https://www.gtinsearch.org/api/items/" + code
    );
    const data = response.data;

    if (data[0]) {
      console.log("GOT IN 1ST TRY");
      addProductHandler(code,data[0])
      res.json(data[0]);
    } else {
      // SECOND TRY
      secondTry(code,req,res)
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).send("Internal Server Error");
  }
}

async function secondTry(code,req,res){
  // SECOND TRY 2222222222222222222222
  console.log("TRY 22222222222222222222222222");
      const settings = {
        url: "https://api.upcdatabase.org/product/" + code,
        method: "GET",
        timeout: 0,
        headers: {
          Authorization: "Bearer THISISALIVEDEMOAPIKEY19651D54X47",
        },
      };

      axios(settings)
        .then((response) => {
          if (response.data.success) {
            console.log("GOT IN 2nd TRY");
            addProductHandler(req.query.code,response.data)
            res.send(response.data);
          } else {
            // THIRD TRY
            const responseData = thirdTry(req.query.code, req, res);
          }
        })
        .catch((error) => {
          console.error("Error fetching data 2nd:", error.response.data);
        });
}

async function thirdTry(code, req, res) {
  try {
    // THIRD TRY 33333333333333
    console.log("TRY 333333333333333333");
    const response = await axios.get(
      " https://www.brocade.io/api/items/" + code
    );
    const data = response.data;

    if (data) {
      console.log("GOT IN 3rd TRY");
      addProductHandler(code,data)
      res.send(data);
    } else {
      fourthTry(code, req, res);
    }
  } catch (error) {
    fourthTry(code, req, res);
  }
}

async function fourthTry(code, req, res) {
  try {
    // FOURTH TRY 4444444
    console.log("TRY 44444444444");
    const response = await axios.get(
      "https://api.barcodespider.com/v1/lookup?token=e359b14ae59ff44b6380&upc="+code
    );
    const data = response.data;

    console.log(data)

    if (data && data.item_response.code == 200) {
      console.log("GOT IN 4th TRY");
      addProductHandler(code,data[0])
      res.json(data);
    } else {
      // fifth TRY
      fifthTRY(code,req,res)
    }
  } catch (error) {
    fifthTRY(code,req,res)
  }
}

async function fifthTRY(code, req, res) {
  // 5TH TRY

  try {

    console.log("TRY 55555555555555555");
    const axios = require("axios");

    const options = {
      method: "GET",
      url: "https://barcodes1.p.rapidapi.com/",
      params: {
        query: code,
      },
      headers: {
        "X-RapidAPI-Key": "28a1aa8d66msh6d641cebad4d626p1c4f86jsn6d655bf181a3",
        "X-RapidAPI-Host": "barcodes1.p.rapidapi.com",
      },
    };

    try {
      const response = await axios.request(options);

      if (response.data && !response.data.results) {
        console.log("GOT IN 5TH TRY");
        addProductHandler(code,response.data)
        res.json(response.data);
      } else {
        sixthTry(code,req,res)
      }
    } catch (error) {
      console.error(error);
    }
  } catch {
    console.log("ERROR IN 5TH TRY");
  }
}

async function sixthTry(code,req,res){
  try {
    console.log("TRY 666666666666666666666");
    const axios = require("axios");

    const options = {
      method: "GET",
      url: "https://big-product-data.p.rapidapi.com/gtin/" + code,
      headers: {
        "X-RapidAPI-Key": "28a1aa8d66msh6d641cebad4d626p1c4f86jsn6d655bf181a3",
        "X-RapidAPI-Host": "big-product-data.p.rapidapi.com",
      },
    };

    try {
      const response = await axios.request(options);

      if (response.data && !response.data.error) {
        console.log("GOT IN 6TH TRY");
        addProductHandler(code,response.data)
        res.json(response.data);
      } else {
        res.json({"data": ""})
      }
    } catch (error) {}
  } catch {
    console.log("ERROR IN 6TH TRY");
  }
}






























