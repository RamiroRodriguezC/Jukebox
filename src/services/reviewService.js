const  Review = require("../models/ReviewModel");

async function getAllReviews() {
    const reviews = await Review.find();
    return reviews;
}

async function getReviewById(id) {
  const reviews = await Review.findById(id);
  return reviews;
}

module.exports = {
    getAllReviews,
    getReviewById,
};