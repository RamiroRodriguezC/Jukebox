const mongoose = require("mongoose");

const artistaSchema = new mongoose.Schema(
  {
    artistaID: { type: String, required: true, trim: true, autoIncrement: true },
    nombre: { type: String, required: true, trim: true},
    pais: { type: String, required: true, trim: true},
    descripcion: { type: String, default: "" },
    url_foto: { type: String, default: "" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Artista", artistaSchema);