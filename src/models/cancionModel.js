const mongoose = require("mongoose");

const cancionSchema = new mongoose.Schema(
  {
    titulo: { type: String, required: true, trim: true},
    duracion: { type: Number, required: true }, // Duracion en segundos
    generos: { type: [String], default: [] },
    isDeleted : { type: Boolean, default: false },

    // *** CAMBIO: Desnormalización del Álbum (título y portada) ***
    album: {
        _id: { type: mongoose.Schema.Types.ObjectId, ref: "Album", required: true },
        titulo: { type: String, required: true },
        url_portada: { type: String, default: "" }, // Para mostrar la carátula sin consultar el álbum
    },

    // *** CAMBIO: Desnormalización del Artista (nombre) ***
    autor: {
        _id: { type: mongoose.Schema.Types.ObjectId, ref: "Artista", required: true },
        nombre: { type: String, required: true } // Para mostrar la canción con su artista
    }
    
  },
  { 
    timestamps: true ,
    collection: 'canciones' 
    //hubo que agregar colecction : 'canciones' porque sino mongoose
    //creaba la coleccion 'cancions' por el pluralizer.
  }
);

module.exports = mongoose.model("Cancion", cancionSchema);