const Artista = require("../models/artistaModel");

exports.getAll = async (req, res) => {
  try {
    const Artistas = await Artista.find();
    res.json(Artistas);
  } catch (err) {
    res.status(500).json({ error: "Error al obtener Artistas" });
  }
};