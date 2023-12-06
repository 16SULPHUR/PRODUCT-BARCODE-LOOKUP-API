const ProductDetails = require("../models/productDetails");

async function addDetails(req, res) {
  const body = req.body;

  await Promise.all([ProductDetails.removeAllListeners({})]);

  console.log(body);

  let product = await ProductDetails.findOne({ code: body.code });

  if (product) {

    console.log(product);

    // const url =
    //   "https://firebasestorage.googleapis.com/v0/b/android-project3-6c2f4.appspot.com/o/productImage%2F998866%2F2";

    // try {
    //   const response = await fetch(url);

    //   if (!response.ok) {
    //     throw new Error(`HTTP error! Status: ${response.status}`);
    //   }

    //   const data = await response.json();
    //   console.log(data);
    // } catch (error) {
    //   console.error("Fetch error:", error.message);
    // }

    // console.log(result);

    await ProductDetails.findByIdAndUpdate(
      { _id: product._id },
      {
        $setOnInsert: {
          "data.ratings": [],
          "data.reviewes": [],
          sustainabilityInfo: {
            ratings: [44],
            recyclability: [],
            recyclabilityDetails: [],
            energyEfficiencyDetails: [],
            packgingDetails: [],
          },
        },
      },
      { upsert: true, new: true }
    );

    await ProductDetails.findByIdAndUpdate(
      { _id: product._id },
      {
        $push: {
          "data.title": body?.title || null,
          "data.description": body?.description || null,
          // "data.images": { $each: body?.images || null },
          "data.ratings": body?.ratings || null,
          "data.reviews": body?.review || null,
          "data.sustainabilityInfo.ratings": body?.sustainabilityInfo?.ratings || null,
          "data.sustainabilityInfo.productRecyclability":
            body?.sustainabilityInfo?.productRecyclability || null,
          "data.sustainabilityInfo.recyclabilityDetails":
            body?.sustainabilityInfo?.recyclabilityDetails || null,
          "data.sustainabilityInfo.packingDetails":
            body?.sustainabilityInfo?.packingDetails || null,
        },
      }
    );

    const pp = await ProductDetails.findOne({ code: body.code });
    res.json(pp);
  } else {
    // Handle the case where the product is not found
    // res.status(404).json({ error: "Product not found" });
  }
}

module.exports = addDetails;
