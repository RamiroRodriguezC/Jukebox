const Album = require("../models/albumModel");

exports.getAll = async (req, res) => {
  try {
    const Albums = await Album.find();
    res.json(Albums);
  } catch (err) {
    res.status(500).json({ error: "Error al obtener Albums" });
  }
};