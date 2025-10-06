const mongoose = require("mongoose");

const albumSchema = new mongoose.Schema(
  {
    titulo: { type: String, required: true, trim: true},
    anio: { type: Number, required: true },
    url_portada: { type: String, default: "" },
    isDeleted : { type: Boolean, default: false },

    // *** CAMBIO: Desnormalización del Artista (nombre) ***
    autor: {
        _id: { type: mongoose.Schema.Types.ObjectId, ref: "Artista", required: true },
        nombre: { type: String, required: true } // Nombre del artista
    },

    // *** CAMBIO: Embeber Tracklist (referencias parciales) ***
    canciones: [{
        _id: { type: mongoose.Schema.Types.ObjectId, ref: "Cancion", required: true },
        titulo: { type: String, required: true } // Título para la lista de canciones (tracklist)
    }]
  },
  
  { timestamps: true }
);

module.exports = mongoose.model("Album", albumSchema);
