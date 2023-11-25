const axios = require("axios");
const sixthTry = require("./sixthAPI");

async function fifthTRY(code, usefulData, req, res) {
  // 5TH TRY

  try {
    console.log("TRY 55555555555555555");

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
        // if (!response.data.properties.title[0].includes("True Grace")) {
          console.log("GOT IN 5TH TRY");

          usefulData.title.push(response.data.product.title);
          usefulData.brand.push(response.data.product.brand);
          usefulData.category.push(response.data.product.category);
          usefulData.description.push(response.data.product.description);
          usefulData.other.ingredients.push(response.data.ingredients);
          usefulData.other.weight = response.data.product.attributes.weight;

          response.data.product.features.forEach((feature) => {
            usefulData.features.push(feature);
          });
          response.data.product.images.forEach((image) => {
            usefulData.images.push(image);
          });
          response.data.product.online_stores.forEach((store) => {
            usefulData.stores.push(store);
          });
        // }

        // console.log(usefulData)
        sixthTry(code, usefulData, req, res);
      } else {
        sixthTry(code, usefulData, req, res);
      }
    } catch (error) {
      console.error("error::::::::::");
      console.error(error);
      sixthTry(code, usefulData, req, res);
    }
  } catch {
    console.log("ERROR IN 5TH TRY");
    sixthTry(code, usefulData, req, res);
  }
}

module.exports = fifthTRY;
