const  Review =  require("../models/reviewModel");
const  Cancion = require("../models/cancionModel");
const  Usuario = require("../models/usuarioModel");
const reviewModel = require("../models/reviewModel");
// FALTARIA EL MANEJO DE ERRORES
async function getAllReviews() {
    const reviews = await Review.find({isDeleted : false});
    return reviews;
}

async function getReviewById(id) {
  const reviews = await Review.find({_id : id, isDeleted : false});
  return reviews;
}

async function createReview(data){
  console.log("entre aca");
  const {rating, like, comentario, cancion, autor} = data;
  console.log(rating + " " + like + " " + comentario + " " + cancion +  " " + autor);

  if (!rating|| !cancion || !autor) {
    return res.status(400).json({ error: "Faltan campos obligatorios" });
  }

    // Validar existencia de cancion y autor
    //Promise ejecuta las busquedas en paralelo, es mas rapido y no tiene que esperar a que se realize una y despues la otra
    const [cancionExiste, autorExiste] = await Promise.all([
      Cancion.findById(cancion),
      Usuario.findById(autor)
    ]);
  
    if (!cancionExiste || !autorExiste) {
      const error = new Error("Canción o autor no encontrados");
      error.statusCode = 404;
      throw error;
    }

  const reviewData = ({rating, cancion, autor});

  // Filtro para insertarlo SOLO si los valores no son undefined.
  // evitar cargas undefined o null
  if (like !== undefined) reviewData.like = like;
  if (comentario !== undefined) reviewData.comentario = comentario;

  const nuevaReview = await Review.create(reviewData);

  return nuevaReview;
}

async function updateReview(id,data){
  const reviewActualizada = Review.update(id, data);
  if (!reviewActualizada) return res.status(404).json({ error: "Review no encontrada" });
  return reviewActualizada;
}

async function deleteReview(id){
  const review = await Review.findById(id);

  if (!review || review.isDeleted) return null;

  review.isDeleted = true;  
  await review.save();

  return review;
}

module.exports = {
    getAllReviews,
    getReviewById,
    createReview,
    updateReview,
    deleteReview,
};