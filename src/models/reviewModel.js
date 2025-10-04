const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    rating: { type: Number, required: true, min: 1, max: 5 },
    like: { type: Boolean, default: false },
    comentario: { type: String, default: "" },
    fecha: { type: Date, default: Date.now },
    isDeleted : { type: Boolean, default: false },

    autor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Usuario",
        required: true
    },
    cancion: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Cancion",
        required: true
    }

  },
  { timestamps: true }
);

module.exports = mongoose.model("Review", reviewSchema);