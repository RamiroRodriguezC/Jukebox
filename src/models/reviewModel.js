const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    reviewID: { type: String, required: true, trim: true, autoIncrement: true },
    usuarioID: { type: String, required: true, trim: true },
    cancionID: { type: String, required: true, trim: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    like: { type: Boolean, default: false },
    comentario: { type: String, default: "" },
    fecha: { type: Date, default: Date.now }

  },
  { timestamps: true }
);

module.exports = mongoose.model("Review", reviewSchema);