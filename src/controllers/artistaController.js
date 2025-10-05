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
    console.log("ID recibido en la ruta:", id);
    try {
        const artista = await artistaService.getArtistaById(id);
        
        if (!artista) {
            return res.status(404).json({ error: "Artista no encontrado" });
        }

        res.status(200).json(artista);
    } catch (err) {
        console.error("Error al obtener el artista:", err);

        res.status(500).json({ error: "Error interno del servidor al obtener el artista" });
    }
};