const Usuario = require("../models/usuarioModel");

async function getAllUsuarios() {
    const usuarios = await Usuario.find();
    return usuarios;
}

module.exports = {
    getAllUsuarios,
};