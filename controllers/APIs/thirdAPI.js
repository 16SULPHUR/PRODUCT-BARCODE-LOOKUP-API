const axios = require("axios");
const fourthTry = require("./fourthAPI");

async function thirdTry(code, usefulData, req, res) {
  try {
    // THIRD TRY 33333333333333
    console.log("TRY 333333333333333333");
    const response = await axios.get(
      " https://www.brocade.io/api/items/" + code
    );
    const data = response.data;

    if (data) {
      console.log("GOT IN 3rd TRY");

      usefulData.title.push(data.name);
      usefulData.size.push(data.size);
      usefulData.other.ingredients.push(data.ingredients || "");
      usefulData.other.serving_per_container.push(data.serving_per_container || "");
      usefulData.other.calories.push(data.calories || "");
      usefulData.other.fat.push(data.fat || "");
      usefulData.other.sodium.push(data.sodium || "");
      usefulData.other.potassium.push(data.potassium || "");
      usefulData.other.carbohydrate.push(data.carbohydrate || "");
      usefulData.other.fiber.push(data.fiber || "");
      usefulData.other.sugar.push(data.sugar || "");
      usefulData.other.protein.push(data.protein || "");
      usefulData.other.author.push(data.author || "");
      usefulData.other.publisher.push(data.publisher || "");
      usefulData.other.pages.push(data.pages || "");
      usefulData.other.alcohol.push(data.alcohol || "");

      // console.log(usefulData);
      fourthTry(code,usefulData, usefulData, req, res);
    } else {
      fourthTry(code,usefulData, usefulData, req, res);
    }
  } catch (error) {
    console.log("error::::::::::");
    // console.log(error);
    fourthTry(code,usefulData, req, res);
  }
}

module.exports = thirdTry;
