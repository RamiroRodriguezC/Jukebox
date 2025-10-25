// src/services/albumService.js
const globalService = require("./globalService");
const Album = require("../models/albumModel");


async function getAllAlbums() {
    // La lógica de la base de datos se queda aquí.
    // Usamos .find() sin parámetros para obtener todos.
    const albums = await globalService.getDocuments(Album );
    return albums;
}

async function getAlbumById(id) {
    const album = await globalService.getDocument(Album, { _id: id });
    return album;
}
// Puedes añadir otras funciones aquí, como getAlbumById, createAlbum, etc.

async function deleteAlbum(id){
    // Reutilizamos la función genérica de 'soft delete' del servicio global
    return await globalService.softDelete(Album, id);

}


module.exports = {
    deleteAlbum,
    getAllAlbums,
    getAlbumById,
    // ... otras funciones
};