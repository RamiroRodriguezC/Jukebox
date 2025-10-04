const Cancion = require("../models/cancionModel");

exports.getAll = async (req, res) => {
  try {
    const Canciones = await Cancion.find();
    res.json(Canciones);
  } catch (err) {
        console.error("Error en la consulta de Canciones:", err); 
    res.status(500).json({ error: "Error al obtener Canciones" });
  }
};