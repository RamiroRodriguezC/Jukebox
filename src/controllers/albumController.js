// 💡 Importamos el MÓDULO DE SERVICIOS en lugar del Modelo
const albumService = require("../services/albumService");

async function getAll(req, res) {
    try {
        // 1. Llama a la función del Servicio para obtener los datos
        //    El controlador NO SABE cómo se obtienen, solo pide el resultado.
        const albums = await albumService.getAllAlbums(); 
        
        // 2. Maneja la respuesta HTTP (200 OK)
        res.status(200).json(albums); 
    
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