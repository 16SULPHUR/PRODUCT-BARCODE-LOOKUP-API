const axios = require("axios");

const secondTry = require("./secondAPI");

async function firstTry(code, usefulData, req, res) {
  try {
    // FIRST TRY
    // console.log("TRY 111111111111111111");
    // const response = await axios.get(
    //   "https://www.gtinsearch.org/api/items/" + code
    // );
    // const data = response.data[0];

    // if (data) {
    //   console.log("GOT IN 1ST TRY");

    //   // usefulData.brand.push(data.brand_name)
    //   // usefulData.size.push(data.size)

    //   secondTry(code,usefulData,req,res)
    // } else {
    //   // SECOND TRY
    // }

    secondTry(code, usefulData, req, res);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).send("Internal Server Error");
  }
}

module.exports = firstTry;
