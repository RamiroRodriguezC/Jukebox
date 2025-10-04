const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    rating: { type: Number, required: true, min: 1, max: 5 },
    like: { type: Boolean, default: false },
    comentario: { type: String, default: "" },
    isDeleted : { type: Boolean, default: false },

    autor: {
        _id: { type: mongoose.Schema.Types.ObjectId, ref: "Usuario", required: true },
        username: { type: String, required: true }, 
        url_profile_photo: { type: String, default: "" } // Asumiendo que se agrega al modelo Usuario
    },
    
    // *** CAMBIO: Desnormalización de Canción (título) ***
    cancion: {
        _id: { type: mongoose.Schema.Types.ObjectId, ref: "Cancion", required: true },
        titulo: { type: String, required: true } ,
        // *** REFINAMIENTO: Agregar el nombre del autor de la canción ***
        autor_nombre: { type: String, required: true } 
    }

  },
  { timestamps: true }
);

module.exports = mongoose.model("Review", reviewSchema);