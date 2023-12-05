const ProductDetails = require("../models/productDetails");

async function addDetails(req, res) {
  const body = req.query;

  console.log(body);

  let product = await ProductDetails.findOne({ code: body.code });
  //   const product = await ProductDetails.findById({_id:p._id})

  if (product) {
    if (body.title) {
      product.data.title.push(body.title);
    }

    if (body.description) {
      product.data.description.push(body.description);
    }

    if (body.images) {
      product.data.images.push(body.images);
    }

    if (product.data.ratings) {
      product.data.ratings.push(body.ratings);
    } else {
      product.data.ratings = [];
      if (body.ratings) {
        product.data.ratings.push(body.ratings);
      }
    }

    if (product.data.review) {
      product.data.review.push(body.review);
    } else {
      product.data.review = [];
      if (body.review) {
        product.data.review.push(body.review);
      }
    }

    if (product.data.sustainabilityRatings) {
      product.data.sustainabilityRatings.push(body.sustainabilityRatings);
    } else {
      product.data.sustainabilityRatings = [];
      if (body.sustainabilityRatings) {
        product.data.sustainabilityRatings.push(body.sustainabilityRatings);
      }
    }

    if (product.data.sustainabilityInfo) {
      if (body.sustainabilityInfo.productRecyclability) {
        product.data.sustainabilityInfo.recyclability.push(
          body.sustainabilityInfo.productRecyclability
        );
      }

      if (body.sustainabilityInfo.recyclabilityDetails) {
        product.data.sustainabilityInfo.recyclabilityDetails.push(
          body.sustainabilityInfo.recyclabilityDetails
        );
      }

      if (body.sustainabilityInfo.packingDetails) {
        product.data.sustainabilityInfo.packingDetails.push(
          body.sustainabilityInfo.packingDetails
        );
      }
    } else {
      product.data.sustainabilityInfo = {
        recyclability: [],
        recyclabilityDetails: [],
        packingDetails: [],
      };

      if (body.sustainabilityInfo.productRecyclability) {
        product.data.sustainabilityInfo.recyclability.push(
          body.sustainabilityInfo.productRecyclability
        );
      }

      if (body.sustainabilityInfo.recyclabilityDetails) {
        product.data.sustainabilityInfo.recyclabilityDetails.push(
          body.sustainabilityInfo.recyclabilityDetails
        );
      }

      if (body.sustainabilityInfo.packingDetails) {
        product.data.sustainabilityInfo.packingDetails.push(
          body.sustainabilityInfo.packingDetails
        );
      }
    }

    const savedProduct = await product.save();
    res.json(savedProduct);
  } else {
  }
}

module.exports = addDetails;
