const ProductDetails = require("../models/productDetails");

async function addDetails(req, res) {
  const body = req.body;

  await Promise.all([ProductDetails.removeAllListeners({})]);

  console.log(body);

  let product = await ProductDetails.findOne({ code: body.code });

  if (product) {
    console.log(product);

    const result = await ProductDetails.findByIdAndUpdate(
      { _id: product._id },
      {
        $setOnInsert: {
          "data.ratings": [],
          "data.reviewes": [],
          sustainabilityInfo: {
            ratings: [],
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
          "data.title": body.title,
          "data.description": body.description,
          "data.images": { $each: body.images },
          "data.ratings": body.ratings,
          "data.reviews": body.review,
          "data.sustainabilityInfo.ratings": body.sustainabilityInfo.ratings,
          "data.sustainabilityInfo.productRecyclability":
            body.sustainabilityInfo.productRecyclability,
          "data.sustainabilityInfo.recyclabilityDetails":
            body.sustainabilityInfo.recyclabilityDetails,
          "data.sustainabilityInfo.packingDetails":
            body.sustainabilityInfo.packingDetails,
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
