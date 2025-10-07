const cancionService = require("../services/cancionService");

async function getAll(req, res) {
  try {
    const canciones = await cancionService.getAllCanciones();
    res.json(canciones);
  } catch (err) {
        console.error("Error en la consulta de Canciones:", err); 
    res.status(500).json({ error: "Error al obtener Canciones" });
  }
};

async function searchCanciones(req, res){
    const busqueda = req.query.q; 
    
    // El Controller maneja los errores de la petición HTTP y llama al Service
    try {
        // Lógica de Negocio: Llama al Service con el dato de la petición
        const resultados = await cancionService.buscarCanciones(busqueda);

        // Respuesta HTTP
        res.status(200).json(resultados);

    } catch (error) {
        // Si el Service lanzó un error (ej: fallo de DB), el Controller responde con 500
        console.error("Error en el controller de búsqueda:", error.message);
        res.status(500).json({ message: "Error interno del servidor." });
    }
}

async function getById(req, res) {
  const id = req.params.id;
  try {
    const canciones = await cancionService.getCancionById(id);
    res.json(canciones);
  } catch (err) {
    res.status(500).json({ error: "Error al obtener la cancion" });
  }
};

async function deleteCancion(req,res){
  await cancionService.deleteCancion(req.params.id);
  res.json({ message: "Cancion eliminada"});
}

module.exports = {
    getAll,
    getById,
    searchCanciones,
    deleteCancion,
};