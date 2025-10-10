const Usuario = require("../models/usuarioModel");
const globalService = require("./globalService");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// FALTARIA EL MANEJO DE ERRORES
async function getAllUsuarios() {
    const usuarios = await Usuario.find({isDeleted : false});
    return usuarios;
}

async function getUsuarioById(id) {
    const usuario = await Usuario.find({_id : id, isDeleted : false});
    return usuario;
}


async function getUsuarioByEmail(mail) {
    const usuario = await Usuario.findOne({ mail });
    return usuario;
}

async function validatePassword(password, usuario) {
    // compare toma el password en texto plano, 
    // lo hashea y lo compara con el hash guardado
    console.log(`La contraseña del usuario que se esta logueando es: ` + password);
    console.log(`La contraseña "hasheada" de la bd es: ` + usuario.passwordHash);
    console.log(` testiando: ` + usuario.mail + " || " + usuario.username);
    const isValid = await bcrypt.compare(password, usuario.passwordHash); 
    return isValid;
    //si son iguales devuelve true, sino false.
}

// PASO 3
function generateToken(usuario) {
    const payload = {
        id: usuario._id,
        email: usuario.mail,
    }

    return jwt.sign(
      payload,
      process.env.JWT_SECRET, // Ver .env o variable de entorno en produccion
      { expiresIn: "30000" } // 30 seg. para probar. Para que expire en 1 hora, colocar '1h'
    );
}

async function createUsuario(data){
  const {mail, passwordHash, username, rol,  url_profile_photo,canciones_favoritas,} = data;

  if (!mail|| !passwordHash || !username) {
    return res.status(400).json({ error: "Faltan campos obligatorios" });
  }

  const reviewData = ({rating, cancion, autor});

  // Filtro para insertarlo SOLO si los valores no son undefined.
  // evitar cargas undefined o null
  if (like !== undefined) reviewData.like = like;
  if (comentario !== undefined) reviewData.comentario = comentario;

  const nuevaReview = await Review.create(reviewData);

  return nuevaReview;
}

async function deleteUsuario(id){
    // Reutilizamos la función genérica de 'soft delete' del servicio global
    return await globalService.softDelete(Usuario, id);
}



module.exports = {
    getAllUsuarios,
    getUsuarioById,
    getUsuarioByEmail,
    validatePassword,
    generateToken,
    createUsuario,
    deleteUsuario,
};