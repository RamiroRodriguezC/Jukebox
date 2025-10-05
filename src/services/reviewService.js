const  Review = require("../models/ReviewModel");

async function getAllReviews() {
    const reviews = await Review.find();
    return reviews;
}

async function getReviewById(id) {
  const reviews = await Review.findById(id);
  return reviews;
}

async function getReviewsByCancionId(idCancion) {
  const reviews = await Review.find({ "cancion._id": idCancion, isDeleted: false });
  return reviews;
}

module.exports = {
    getAllReviews,
    getReviewById,
    getReviewsByCancionId,
};