const  Cancion = require("../models/cancionModel");

async function getAllCanciones() {
    const canciones = await Cancion.find();
    return canciones;
}

async function getCancionById(id) {
    const cancion = await Cancion.findById(id);
    return cancion;
}

module.exports = {
    getAllCanciones,
    getCancionById,
};