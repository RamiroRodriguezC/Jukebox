const artistaService = require("../services/artistaService");


async function getAll(req, res) {
  try {
      // 1. Leemos los parámetros de paginación desde la URL (query string)
      // Ej: /reviews?limit=10&cursor=a1b2c3d4
      const options = {
        limit: req.query.limit,
        cursor: req.query.cursor
      };
      const artistas = await artistaService.getAllArtistas(options);
      res.json(artistas);
  } catch (err) {
    res.status(500).json({ error: "Error al obtener Artistas" });
  }
};

async function getById(req, res) {
  const id = req.params.id;
  try {
    const artistas = await artistaService.getArtistaById(id);
    res.json(artistas);
  } catch (err) {
    res.status(500).json({ error: "Error al obtener el artista" });
  }
};

async function deleteArtista(req,res){
  await artistaService.deleteArtista(req.params.id);
  res.json({ message: "Artista eliminado"});
}

module.exports = {
  getAll,
  getById,
  deleteArtista,
};