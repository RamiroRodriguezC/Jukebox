const cancionService = require("../services/cancionService");

exports.getAll = async (req, res) => {
  try {
    const canciones = await cancionService.getAllCanciones();
    res.json(canciones);
  } catch (err) {
        console.error("Error en la consulta de Canciones:", err); 
    res.status(500).json({ error: "Error al obtener Canciones" });
  }
};

exports.getById = async (req, res) => {
    const id = req.params.id; 
    console.log("ID recibido en la ruta:", id);
    try {
        const cancion = await cancionService.getCancionById(id);
        
        if (!cancion) {
            return res.status(404).json({ error: "Canción no encontrada" });
        }

        res.status(200).json(cancion);
    } catch (err) {
        console.error("Error al obtener canción:", err);

        res.status(500).json({ error: "Error interno del servidor al obtener la canción" });
    }
};

exports.getReviewsByCancionId = async (req, res) => {
  const id = req.params.id;
  console.log("ID de canción recibido:", id);
  try {
    const reviews = await cancionService.getReviewsByCancionId(id);
    if (!reviews || reviews.length === 0) {
      return res.status(404).json({ message: "No hay reviews para esta canción" });
    }

    res.status(200).json(reviews);
  } catch (err) {
    console.error("Error al obtener la review:", err);
    res.status(500).json({ error: "Error interno del servidor al obtener las reviews" });
  }
};