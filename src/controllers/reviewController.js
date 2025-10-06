const reviewService = require("../services/reviewService");

async function getAll(req, res) {
  try {
    const reviews = await reviewService.getAllReviews();
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ error: "Error al obtener Reviews" });
  }
};

async function getById(req, res){
  const id = req.params.id;
  try {
    const reviews = await reviewService.getReviewById(id);
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ error: "Error al obtener el artista" });
  }
};

module.exports = {
    getAll,
    getById,
};