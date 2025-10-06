// src/services/albumService.js

const Album = require("../models/albumModel");

// FALTARIA EL MANEJO DE ERRORES

/**
 * Función que obtiene todos los álbumes de la base de datos.
 * Es la única responsable de la interacción con el modelo de Mongoose.
 * No recibe req ni res.
 */
async function getAllAlbums() {
    // La lógica de la base de datos se queda aquí.
    // Usamos .find() sin parámetros para obtener todos.
    const albums = await Album.find();
    return albums;
}

async function getAlbumById(id) {
    const album = await Album.findById(id);
    return album;
}
// Puedes añadir otras funciones aquí, como getAlbumById, createAlbum, etc.

module.exports = {
    getAllAlbums,
    getAlbumById,
    // ... otras funciones
};