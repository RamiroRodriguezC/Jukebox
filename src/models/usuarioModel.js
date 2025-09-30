const mongoose = require("mongoose");

const usuarioSchema = new mongoose.Schema(
  {
    usuarioID: { type: String, required: true, trim: true, autoIncrement: true },
    mail: { type: String, required: true, unique: true, trim: true},
    passwordHash: { type: String, default: "#FFFFFF" },
    username: {type: String, required: true, trim: true},
    rol: { type: String, enum: ["admin", "user"], default: "user" },
    estado: { type: String, enum: ["activo", "inactivo"], default: "activo" },
    fecha_registro: { type: Date, default: Date.now }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Usuario", usuarioSchema);