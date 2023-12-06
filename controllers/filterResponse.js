async function filterResponse(product) {
    let titles = product.data.title;
    let descriptions = product.data.description;
    let ratings = product.data.ratings;
    let reviews = product.data.reviews;
    let packingDetails = product.data.sustainabilityInfo.packingDetails;
    let productRecyclability = product.data.sustainabilityInfo.productRecyclability;
    let sustainabilityRatings = product.data.sustainabilityInfo.ratings;
    let recyclabilityDetails = product.data.sustainabilityInfo.recyclabilityDetails;
  
    let new_titles = [];
    let new_descriptions = [];
    let new_ratings = [];
    let new_reviews = [];
    let new_packingDetails = [];
    let new_productRecyclability = [];
    let new_sustainabilityRatings = [];
    let new_recyclabilityDetails = [];
  
    titles.forEach((title) => {
      if (title !== null && title !== "" && title !== "null") {
        new_titles.push(title);
      }
    });
  
    descriptions.forEach((desc) => {
      if (desc !== null && desc !== "" && desc !== "null") {
        new_descriptions.push(desc);
      }
    });
  
    ratings.forEach((rating) => {
      if (rating !== null && rating !== "" && rating !== "null") {
        new_ratings.push(rating);
      }
    });
  
    reviews.forEach((review) => {
      if (review !== null && review !== "" && review !== "null") {
        new_reviews.push(review);
      }
    });
  
    packingDetails.forEach((pd) => {
      if (pd !== null && pd !== "" && pd !== "null") {
        new_packingDetails.push(pd);
      }
    });
  
    productRecyclability.forEach((pr) => {
      if (pr !== null && pr !== "" && pr !== "null") {
        new_productRecyclability.push(pr);
      }
    });
  
    sustainabilityRatings.forEach((sr) => {
      if (sr !== null && sr !== "" && sr !== "null") {
        new_sustainabilityRatings.push(sr);
      }
    });
  
    recyclabilityDetails.forEach((rd) => {
      if (rd !== null && rd !== "" && rd !== "null") {
        new_recyclabilityDetails.push(rd);
      }
    });
  
    product.data.title = new_titles;
    product.data.description = new_descriptions;
    product.data.ratings = new_ratings;
    product.data.reviews = new_reviews;
    product.data.sustainabilityInfo.packingDetails = new_packingDetails;
    product.data.sustainabilityInfo.productRecyclability = new_productRecyclability;
    product.data.sustainabilityInfo.ratings = new_sustainabilityRatings;
    product.data.sustainabilityInfo.recyclabilityDetails = new_recyclabilityDetails;
  
    // Now your product object is modified with null and blank values removed
    // console.log("product:::::::::");
    // console.log(product);

    return product;
  }
  
  module.exports = filterResponse;
  