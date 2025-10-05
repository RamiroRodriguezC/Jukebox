const mongoose = require("mongoose");

const cancionSchema = new mongoose.Schema(
  {
    titulo: { type: String, required: true, trim: true},
    duracion: { type: Number, required: true }, // Duracion en segundos
    generos: { type: [String], default: [] },
    fecha_salida: { type: Date, default: null },
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
    },

    reviews: [{
      _id: { type: mongoose.Schema.Types.ObjectId, ref: "Review", required: true },
      rating: { type: Number, required: true, min: 1, max: 5 },
      like: { type: Boolean, default: false },
      comentario: { type: String, default: "" },
        
      autor: {
        _id: { type: mongoose.Schema.Types.ObjectId, ref: "Usuario", required: true },
        username: { type: String, required: true }, 
        url_profile_photo: { type: String, default: "" } // Asumiendo que se agrega al modelo Usuario
      },
    }],
  },
  { 
    timestamps: true ,
    collection: 'canciones' 
    //hubo que agregar colecction : 'canciones' porque sino mongoose
    //creaba la coleccion 'cancions' por el pluralizer.
  }
);

module.exports = mongoose.model("Cancion", cancionSchema);