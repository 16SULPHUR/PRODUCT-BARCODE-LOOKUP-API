const axios = require("axios");

const thirdTry = require("./thirdAPI");

async function secondTry(code, usefulData, req, res) {
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

        usefulData.title.push(response.data.title);
        usefulData.description.push(response.data.description);
        usefulData.alias.push(response.data.alias);
        usefulData.category.push(response.data.category);

        // console.log(usefulData);
        thirdTry(code, usefulData, req, res);
      } else {
        // THIRD TRY
        thirdTry(req.query.code,usefulData, req, res);
      }
    })
    .catch((error) => {
      console.error("Error fetching data 2nd:", error.response.data);
    });
}

module.exports = secondTry;
