const Usuario = require("../models/usuarioModel");

async function getAllUsuarios() {
    const usuarios = await Usuario.find();
    return usuarios;
}

async function getUsuarioById(id) {
    const usuario = await Usuario.findById(id);
    return usuario;
}

module.exports = {
    getAllUsuarios,
    getUsuarioById,
};