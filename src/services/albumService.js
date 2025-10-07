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
    const albums = await Album.find({isDeleted : false});
    return albums;
}

async function getAlbumById(id) {
    const album = await Album.find({_id : id, isDeleted : false});
    return album;
}
// Puedes añadir otras funciones aquí, como getAlbumById, createAlbum, etc.

async function deleteAlbum(id){
    const album = await Album.findById(id);
  
    if (!album || album.isDeleted) return null;
  
    album.isDeleted = true;  
    await album.save();
  
    return album;
  }

module.exports = {
    getAllAlbums,
    getAlbumById,
    deleteAlbum,
    // ... otras funciones
};