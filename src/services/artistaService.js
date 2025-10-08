const Artista = require("../models/artistaModel");

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
    const artista = await Artista.findById(id);
  
    if (!artista || artista.isDeleted) return null;
  
    artista.isDeleted = true;  
    await artista.save();
  
    return artista;
  }

module.exports = {
    getAllArtistas,
    getArtistaById,
    deleteArtista,
};