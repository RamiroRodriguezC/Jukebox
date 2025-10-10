// src/services/albumService.js
const globalService = require("./globalService");
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
    const albums = await Album.find({isDeleted : false});
    return albums;
}

async function getAlbumById(id) {
    const album = await Album.find({_id : id, isDeleted : false});
    return album;
}
// Puedes añadir otras funciones aquí, como getAlbumById, createAlbum, etc.

async function deleteAlbum(id){
    // Reutilizamos la función genérica de 'soft delete' del servicio global
    return await globalService.softDelete(Album, id);

}


module.exports = {
    getAllAlbums,
    getAlbumById,
    deleteAlbum,
    // ... otras funciones
};