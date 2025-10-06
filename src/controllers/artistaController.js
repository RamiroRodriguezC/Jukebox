const artistaService = require("../services/artistaService");

exports.getAll = async (req, res) => {
  try {
    const artistas = await artistaService.getAllArtistas();
    res.json(artistas);
  } catch (err) {
    res.status(500).json({ error: "Error al obtener Artistas" });
  }
};

exports.getById = async (req, res) => {
  const id = req.params.id;
  try {
    const artistas = await artistaService.getArtistaById(id);
    res.json(artistas);
  } catch (err) {
    res.status(500).json({ error: "Error al obtener el artista" });
  }
};