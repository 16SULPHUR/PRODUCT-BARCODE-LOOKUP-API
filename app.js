const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const bodyParser = require("body-parser");
const path = require("path")
const ProductDetails = require("./models/productDetails");
const addProductHandler = require("./controllers/addProductHandler")
const axios = require("axios");
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
  res.send("index")
});

app.get("/p", async (req, res) => {
  
  console.log(req.query)
  
  addProductHandler(req, res)
  const allProducts = await ProductDetails.find()
  res.json(allProducts)
});

app.get("/s", async (req, res) => {
  try {

    // FIRST TRY
    const response = await axios.get("https://www.gtinsearch.org/api/items/"+ req.query.code);
    const data = response.data;

    if(data[0]){
      console.log("GOT IN 1ST TRY")
      res.json(data[0]);
    }
    else{

      // SECOND TRY
      const settings = {
        url: "https://api.upcdatabase.org/product/"+req.query.code,
        method: "GET",
        timeout: 0,
        headers: {
          Authorization: "Bearer THISISALIVEDEMOAPIKEY19651D54X47",
        },
      };
      
      axios(settings)
        .then((response) => {

          if(response.data.success){
            console.log("GOT IN 2nd TRY")
            res.send(response.data)
          }
          else{

            // THIRD TRY
            const responseData = thirdTry(req.query.code,req,res)
            
          }
        })
        .catch((error) => {
          console.error("Error fetching data 2nd:", error.response.data);
        });
    }
    


  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.listen(PORT, () => {
  console.log(`Example app listening on ${PORT}`);
});





  async function thirdTry (code,req,res){
  const response = await axios.get(" https://www.brocade.io/api/items/"+ code);
    const data = response.data;

    if(data){
      console.log("GOT IN 3rd TRY")
      res.send(data)
    }
    else{}
}