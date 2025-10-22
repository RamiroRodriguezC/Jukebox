const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    rating: { type: Number, required: true, min: 0, max: 5 },
    like: { type: Boolean, default: false },
    comentario: { type: String },
    isDeleted : { type: Boolean, default: false },

    autor: {
        _id: { type: mongoose.Schema.Types.ObjectId, ref: "Usuario", required: true },
        username: { type: String, required: true }, 
        url_profile_photo: { type: String, default: "" } // Asumiendo que se agrega al modelo Usuario
    },
    
    // Reseña polimorfica (Albunes o Canciones);
    // https://mongoosejs.com/docs/populate.html#dynamic-refpath <-- Mongoose Dynamic References
    
    entidad_tipo: {
        type: String,
        required: true,
        enum: ['Cancion', 'Album'] // Solo se puede reseñar Canciones o Álbumes
    },
    entidad_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        refPath: 'entidad_tipo' // Mongoose apuntará dinámicamente al modelo correcto
    },

    // CAMBIO: Datos desnormalizados de la entidad reseñada
    entidad_info: {
        titulo: { type: String, required: true },
        autor_nombre: { type: String, required: true }, // Podría ser el nombre del artista principal
        url_portada: { type: String, default: "" } // Útil tanto para canciones como para álbumes
    }
  },
  { timestamps: true,
    collection: 'reviews' 
  }
);

module.exports = mongoose.model("Review", reviewSchema);