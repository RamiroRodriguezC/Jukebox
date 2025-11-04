const reviewService = require("../services/reviewService");

async function getAll(req, res) {
  try {
    // 1. Leemos los parámetros de paginación desde la URL (query string)
    // Ej: /reviews?limit=10&cursor=a1b2c3d4
    const options = {
      limit: req.query.limit,
      cursor: req.query.cursor
    };

    const reviews = await reviewService.getAllReviews(options);
    res.json(reviews);
  } catch (err) {
    res.status(500).json({error: err.message });
  }
};

async function getById(req, res){
  const id = req.params.id;
  console.log("ID recibido en el CONTROLLER:", `'${id}'`);
  try {
    const reviews = await reviewService.getReviewById(id);
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ error: err.message });
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
  res.status(201).json({ message: "Receta eliminada"});
}

/* async function getAlbumReviews(req,res){
    try {
        // 1. Leemos los parámetros de paginación desde la URL (query string)
        // Ej: /reviews?limit=10&cursor=a1b2c3d4
        const options = {
          limit: req.query.limit,
          cursor: req.query.cursor
        };
        const reviews = await reviewService.getAlbumReviews(req.params.id, options);
        res.status(200).json(reviews);
    } catch (err) {
        res.status(500).json({ error: `Error al obtener las reviews de la canción: \n ${err.message}` });
    }
}

async function getSongReviews(req,res){
    try {
          // 1. Leemos los parámetros de paginación desde la URL (query string)
          // Ej: /reviews?limit=10&cursor=a1b2c3d4
          const options = {
            limit: req.query.limit,
            cursor: req.query.cursor
          };
        const reviews = await reviewService.getSongReviews(req.params.id, options);
        res.status(200).json(reviews);
    } catch (err) {
        res.status(500).json({ error: `Error al obtener las reviews de la canción: \n ${err.message}` });
    }
}

async function getUserReviews(req,res){
    try {
          // 1. Leemos los parámetros de paginación desde la URL (query string)
          // Ej: /reviews?limit=10&cursor=a1b2c3d4
          const options = {
            limit: req.query.limit,
            cursor: req.query.cursor
          };
        const reviews = await reviewService.getUserReviews(req.params.id, options);
        res.status(200).json(reviews);
    } catch (err) {
        res.status(500).json({ error: `Error al obtener las reviews del usuario: \n ${err.message}` });
    }
}
*/
module.exports = {
    getAll,
    getById,
    createReview,
    updateReview,
    deleteReview,
    /* getSongReviews,
    getUserReviews,
    getAlbumReviews, */
};