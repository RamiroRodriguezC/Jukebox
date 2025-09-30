const mongoose = require("mongoose");

const albumSchema = new mongoose.Schema(
  {
    albumID: { type: String, required: true, trim: true, autoIncrement: true },
    titulo: { type: String, required: true, trim: true},
    artistaID: { type: String, required: true, trim: true},
    anio: { type: Number, required: true },
    url_portada: { type: String, default: "" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Album", albumSchema);