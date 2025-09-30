const Usuario = require("../models/usuarioModel");

exports.getAll = async (req, res) => {
  try {
    const Usuarios = await Usuario.find();
    res.json(Usuarios);
  } catch (err) {
    res.status(500).json({ error: "Error al obtener Usuarios" });
  }
};