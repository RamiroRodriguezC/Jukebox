// 💡 Importamos el MÓDULO DE SERVICIOS en lugar del Modelo
const albumService = require("../services/albumService");

async function getAll(req, res) {
    try {
        const albums = await albumService.getAllAlbums();
        res.json(artistas); 
    } catch (err) {
        // 3. Maneja el error HTTP (500 Internal Server Error)
        console.error("Error al obtener álbumes:", err); 
        res.status(500).json({ 
            error: "Error interno del servidor al obtener Albums" 
        });
    }
};

async function getById(req, res) {
  const id = req.params.id;
  try {
    const albums = await albumService.getAlbumById(id); 
    res.json(albums);
  } catch (err) {
    res.status(500).json({ error: "Error al obtener el album" });
  }
};

async function deleteAlbum(req,res){
  await albumService.deleteAlbum(req.params.id);
  res.json({ message: "Album eliminado"});
}

module.exports = {
    getAll,
    getById,
    deleteAlbum,
};