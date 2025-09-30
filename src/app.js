require("dotenv").config(); // 👈 Agregá esta línea
// src/app.js
const express = require("express");
const cors = require("cors");
const usuarioRoutes = require("./routes/usuarioRoutes");
const connectDB = require("./config/db");

const app = express();
app.use(cors()); // middleware para...
app.use(express.json()); // middleware para...

// Conectar BD
connectDB();

// Rutas
app.use("/usuarios", usuarioRoutes);

// Inicio del server
const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});