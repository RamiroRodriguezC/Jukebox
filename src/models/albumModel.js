const mongoose = require("mongoose");

const albumSchema = new mongoose.Schema(
  {
    titulo: { type: String, required: true, trim: true},
    anio: { type: Number, required: true },
    url_portada: { type: String, default: "" },
    isDeleted : { type: Boolean, default: false },

    autor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Artista",
        trim: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Album", albumSchema);