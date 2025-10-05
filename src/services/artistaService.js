const Artista = require("../models/artistaModel");

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