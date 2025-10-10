const Artista = require("../models/artistaModel");
const globalService = require("./globalService");

// FALTARIA EL MANEJO DE ERRORES
async function getAllArtistas() {
    const artistas = await Artista.find({isDeleted : false});
    return artistas;
}

async function getArtistaById(id) {
    const artista = await Artista.find({_id : id, isDeleted : false});
    return artista;
}

async function deleteArtista(id){
    // Reutilizamos la función genérica de 'soft delete' del servicio global
        return await globalService.softDelete(Artista, id);
}


module.exports = {
    getAllArtistas,
    getArtistaById,
    deleteArtista,
};