const axios = require("axios");
const addProductHandler = require("../addProductHandler")
async function sixthTry(code,usefulData,req,res){
    try {
      console.log("TRY 666666666666666666666");
  
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
          
          usefulData.size.push(response.data.properties.size)
          usefulData.other.ingredients.push(response.data.properties.ingredients)
          response.data.properties.title.forEach(t => {
            usefulData.title.push(t)
          });
          response.data.properties.brand.forEach(b => {
            usefulData.brand.push(b)
          });
          response.data.properties.description.forEach(desc => {
            usefulData.description.push(desc)
          });
          if(response.data.properties.features){
          response.data.properties.features.forEach(feature => {
            usefulData.features.push(feature)
          });}
          response.data.stores.forEach(store => {
            usefulData.stores.push(store)
            usefulData.images.push(store.image)
          });

          addProductHandler(code,usefulData)
        res.json(usefulData)
        } else{
          addProductHandler(code,usefulData)
          res.json(usefulData)
        }


      } catch (error) {
        console.log(error);
      }
    } catch {
      console.log("ERROR IN 6TH TRY");
    }
  }

  module.exports = sixthTry;