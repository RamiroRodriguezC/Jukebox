const mongoose = require("mongoose");

const cancionSchema = new mongoose.Schema(
  {
    titulo: { type: String, required: true, trim: true},
    duracion: { type: Number, required: true }, // Duracion en segundos
    generos: { type: [String], default: [] },
    isDeleted : { type: Boolean, default: false },

    album: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Album",
        required: true
    },

    autor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Artista",
        required: true
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