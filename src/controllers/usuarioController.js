const usuarioService = require("../services/usuarioService");

exports.getAll = async (req, res) => {
  try {
    const usuarios = await usuarioService.getAllUsuarios();
    res.json(usuarios);
  } catch (err) {
    res.status(500).json({ error: "Error al obtener Usuarios" });
  }
};