const Artista = require("../models/artistaModel");
const globalService = require("./globalService");

// FALTARIA EL MANEJO DE ERRORES
async function getAllArtistas(options = {}) {
    const artistas = await globalService.getDocuments(Artista, options);
    return artistas;
}

async function getArtistaById(id) {
    const artista = await globalService.getDocument(Artista, { _id: id });
    return artista;
}

async function deleteArtista(id){
    // Reutilizamos la función genérica de 'soft delete' del servicio global
        return await globalService.softDelete(Artista, id);
}


module.exports = {
    deleteArtista,
    getAllArtistas,
    getArtistaById, 
};