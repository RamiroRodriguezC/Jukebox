const mongoose = require("mongoose");

const usuarioSchema = new mongoose.Schema(
  {
    mail: { type: String, required: true, unique: true, trim: true},
    passwordHash: { type: String, default: "#FFFFFF" },
    username: {type: String, required: true, trim: true},
    rol: { type: String, enum: ["admin", "user"], default: "user" },
    isDeleted : { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Usuario", usuarioSchema);