const mongoose = require("mongoose");

const artistaSchema = new mongoose.Schema(
  {
    nombre: { type: String, required: true, trim: true},
    pais: { type: String, required: true, trim: true},
    descripcion: { type: String, default: "" },
    url_foto: { type: String, default: "" },
    isDeleted : { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Artista", artistaSchema);