const axios = require("axios");

const secondTry = require("./secondAPI");

async function firstTry(code, usefulData, req, res) {

  try {
    let response = await fetch("https://api.vegancheck.me/v0/product/4066600204404", { 
  method: "POST"
});

let data = await response.text();
console.log("vegan api 1111111111111111111111111111111111111111111");
console.log(data);



// const response = await axios.get(
//   "https://api.vegancheck.me/v0/product/8907234007831", { 
//     method: "POST"
//   }
// );
// const data = response.data;
// console.log("vegan api 1111111111111111111111111111111111111111111");
// console.log(data);





    secondTry(code, usefulData, req, res);
  } catch (error) {
    console.error("Error fetching data11111111111111111111111", error);
    res.status(500).send("Internal Server Error");
  }
}

module.exports = firstTry;
