require("dotenv").config(); // 👈 Agregá esta línea
// src/app.js
const express = require("express");
const cors = require("cors");
const usuarioRoutes = require("./routes/usuarioRoutes");
const albumRoutes = require("./routes/albumRoutes");
const artistaRoutes = require("./routes/artistaRoutes");
const cancionRoutes = require("./routes/cancionRoutes");
const reviewRoutes = require("./routes/reviewRoutes");  

const connectDB = require("./config/db");

const app = express();
app.use(cors()); // middleware para...
app.use(express.json()); // middleware para...

// Conectar BD
connectDB();

// Rutas
app.use("/albums"   , albumRoutes);
app.use("/artistas" , artistaRoutes);
app.use("/canciones", cancionRoutes);
app.use("/reviews"  , reviewRoutes);
app.use("/usuarios" , usuarioRoutes);

// Inicio del server
const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});