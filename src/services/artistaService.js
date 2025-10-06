const Artista = require("../models/artistaModel");

// FALTARIA EL MANEJO DE ERRORES
async function getAllArtistas() {
    const artistas = await Artista.find();
    return artistas;
}

async function getArtistaById(id) {
    const artista = await Artista.findById(id);
    return artista;
}

module.exports = {
    getAllArtistas,
    getArtistaById,
};