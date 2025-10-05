const usuarioService = require("../services/usuarioService");

exports.getAll = async (req, res) => {
  try {
    const usuarios = await usuarioService.getAllUsuarios();
    res.json(usuarios);
  } catch (err) {
    res.status(500).json({ error: "Error al obtener Usuarios" });
  }
};

exports.getById = async (req, res) => {
    const id = req.params.id; 
    console.log("ID recibido en la ruta:", id);
    try {
        const usuario = await usuarioService.getUsuarioById(id);
        
        if (!usuario) {
            return res.status(404).json({ error: "Usuario no encontrado" });
        }

        res.status(200).json(usuario);
    } catch (err) {
        console.error("Error al obtener el usuario:", err);

        res.status(500).json({ error: "Error interno del servidor al obtener al usuario" });
    }
};