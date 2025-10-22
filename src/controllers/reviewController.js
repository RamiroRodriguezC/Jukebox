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
  console.log("ID recibido en el CONTROLLER:", `'${id}'`);
  try {
    const reviews = await reviewService.getReviewById(id);
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ error: "Error al obtener la review" });
  }
};

async function createReview(req,res) {
      const review = await reviewService.createReview(req.body);
      res.status(201).json(review);
}

async function updateReview(req,res){
  const reviewActualizada = await reviewService.updateReview(req.params.id, req.body);
  res.status(201).json(reviewActualizada);
}

async function deleteReview(req,res){
  await reviewService.deleteReview(req.params.id);
  res.json({ message: "Receta eliminada"});
}
/*
exports.updateReceta = (req, res) => {
  const id = parseInt(req.params.id);
  const actualizada = Receta.update(id, req.body);
  if (!actualizada) return res.status(404).json({ error: "Receta no encontrada" });
  res.json(actualizada);
};

exports.deleteReceta = (req, res) => {
  const id = parseInt(req.params.id);
  const eliminada = Receta.remove(id);
  if (!eliminada) return res.status(404).json({ error: "Receta no encontrada" });
  res.json({ message: "Receta eliminada" });
};
*/

module.exports = {
    getAll,
    getById,
    createReview,
    updateReview,
    deleteReview,
};