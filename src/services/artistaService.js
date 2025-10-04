const Artista = require("../models/artistaModel");

async function getAllArtistas() {
    const artistas = await Artista.find();
    return artistas;
}

module.exports = {
    getAllArtistas,
};