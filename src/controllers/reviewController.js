const reviewService = require("../services/reviewService");

exports.getAll = async (req, res) => {
  try {
    const reviews = await reviewService.getAllReviews();
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ error: "Error al obtener Reviews" });
  }
};

exports.getById = async (req, res) => {
    const id = req.params.id; 
    console.log("ID recibido en la ruta:", id);
    try {
        const reviews = await reviewService.getReviewById(id);
        
        if (!reviews) {
            return res.status(404).json({ error: "Review no encontrada" });
        }

        res.status(200).json(reviews);
    } catch (err) {
        console.error("Error al obtener la review:", err);

        res.status(500).json({ error: "Error interno del servidor al obtener la review" });
    }
};

exports.getReviewsByCancionId = async (req, res) => {
  const id = req.params.id; // Id de la canción
  console.log("ID de canción recibido:", id);
  try {
    const reviews = await reviewService.getReviewsByCancionId(id);

    if (!reviews) {
      return res.status(404).json({ message: "No hay reviews para esta canción" });
    }

    res.status(200).json(reviews);
  } catch (err) {
    console.error("Error al obtener la review:", err);
    res.status(500).json({ error: "Error interno del servidor al obtener las reviews" });
  }
};