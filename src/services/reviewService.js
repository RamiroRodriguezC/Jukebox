const  Review = require("../models/ReviewModel");

async function getAllReviews() {
    const reviews = await Review.find();
    return reviews;
}

module.exports = {
    getAllReviews,
};