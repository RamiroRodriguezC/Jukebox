const mongoose = require("mongoose");

const cancionSchema = new mongoose.Schema(
  {
    cancionID : { type: String, required: true, trim: true, autoIncrement: true },
    titulo: { type: String, required: true, trim: true},
    duracion: { type: Number, required: true }, // Duracion en segundos
    generos: { type: [String], default: [] },
    album: {
        type: albumSchema,
        required: true
    },

    artista: {
        type: artistaSchema,
        required: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Cancion", cancionSchema);