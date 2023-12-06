const axios = require("axios");
const addProductHandler = require("../addProductHandler");
const ProductDetails = require("../../models/productDetails");
const filterResponse = require("../filterResponse");
async function sixthTry(code, usefulData, req, res) {
  try {
    console.log("TRY 666666666666666666666");

    const options = {
      method: "GET",
      url: "https://big-product-data.p.rapidapi.com/gtin/850028009338",
      headers: {
        "X-RapidAPI-Key": "510492ceb8mshd1a58aa9483c522p10c0d0jsn85dfb5250874",
        "X-RapidAPI-Host": "big-product-data.p.rapidapi.com",
      },
    };

    try {
      const response = await axios.request(options);

      if (response.data && !response.data.error) {
        console.log("GOT IN 6TH TRY");

        if (!response.data.properties.title[0].includes("True Grace")) {
          usefulData.size.push(response.data.properties.size);
          usefulData.other.ingredients.push(
            response.data.properties.ingredients
          );
          response.data.properties.title.forEach((t) => {
            usefulData.title.push(t);
          });
          response.data.properties.brand.forEach((b) => {
            usefulData.brand.push(b);
          });
          response.data.properties.description.forEach((desc) => {
            usefulData.description.push(desc);
          });
          if (response.data.properties.features) {
            response.data.properties.features.forEach((feature) => {
              usefulData.features.push(feature);
            });
          }
          response.data.stores.forEach((store) => {
            usefulData.stores.push(store);
            usefulData.images.push(store.image);
          });

        }
        const resp = await addProductHandler(code, usefulData);
        filterResponse(resp)
        res.json(resp);
      } else {
        const resp = await addProductHandler(code, usefulData);
        const filteredResponse = await filterResponse(resp)
        res.json(filteredResponse);
      }
    } catch (error) {
      console.log(error);
    }
  } catch {
    console.log("ERROR IN 6TH TRY");
  }
}

module.exports = sixthTry;
