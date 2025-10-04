const reviewService = require("../services/reviewService");

exports.getAll = async (req, res) => {
  try {
    const reviews = await reviewService.getAllReviews();
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ error: "Error al obtener Reviews" });
  }
};