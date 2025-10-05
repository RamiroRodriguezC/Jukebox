const Cancion = require("../models/cancionModel");

async function getAllCanciones() {
    const canciones = await Cancion.find();
    return canciones;
}

async function getCancionById(id) {
    const canciones = await Cancion.findById(id);
    return canciones;
}

async function getReviewsByCancionId(id) {
    const cancion = await Cancion.findById(id);
    const reviews = cancion.reviews;
    console.log(cancion, reviews);
    return reviews;
}

module.exports = {
    getAllCanciones,
    getCancionById,
    getReviewsByCancionId,
};