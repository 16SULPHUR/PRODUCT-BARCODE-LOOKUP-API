const axios = require("axios");
const fifthTRY = require("./fifthAPI");

async function fourthTry(code,usefulData, req, res) {
    try {
      // FOURTH TRY 4444444
      console.log("TRY 44444444444");
      const response = await axios.get(
        "https://api.barcodespider.com/v1/lookup?token=e359b14ae59ff44b6380&upc="+code
      );
      const data = response.data;
  
      if (data && data.item_response.code == 200) {
        console.log("GOT IN 4th TRY");

        usefulData.title.push(data.item_attributes.title)
        usefulData.brand.push(data.item_attributes.brand)
        usefulData.category.push(data.item_attributes.category)
        usefulData.description.push(data.item_attributes.description)
        usefulData.images.push(data.item_attributes.image)
        usefulData.other.weight = (data.item_attributes.weight)
        data.Stores.forEach(store => {
          usefulData.images.push(store.image)
          usefulData.stores.push(store)
        });

        // console.log(usefulData)

       fifthTRY(code,usefulData,req,res)
      } else {
        // fifth TRY
        fifthTRY(code,usefulData,req,res)
      }
    } catch (error) {
      fifthTRY(code,usefulData,req,res)
    }
  }

  module.exports = fourthTry;