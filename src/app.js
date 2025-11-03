require("dotenv").config(); // 👈 Agregá esta línea
// src/app.js
const express = require("express"); // express es un framework de Node.js que facilita la creación de aplicaciones web y APIs.
const cors = require("cors"); // CORS = Cross-Origin Resource Sharing, que es lo que permite que un servidor acepte peticiones de otros dominios.
const usuarioRoutes = require("./routes/usuarioRoutes");
const albumRoutes = require("./routes/albumRoutes");
const artistaRoutes = require("./routes/artistaRoutes");
const cancionRoutes = require("./routes/cancionRoutes");
const reviewRoutes = require("./routes/reviewRoutes");  

const connectDB = require("./config/db");

const app = express();
app.use(cors()); // middleware para habilitar CORS
app.use(express.json()); 

// Conectar BD
connectDB();

// Rutas
app.use("/albums"   , albumRoutes);
app.use("/artistas" , artistaRoutes);
app.use("/canciones", cancionRoutes);
app.use("/reviews"  , reviewRoutes);
app.use("/usuarios" , usuarioRoutes);

// Inicio del server
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});