const Review = require("../models/reviewModel");

exports.getAll = async (req, res) => {
  try {
    const Reviews = await Review.find();
    res.json(Reviews);
  } catch (err) {
    res.status(500).json({ error: "Error al obtener Reviews" });
  }
};