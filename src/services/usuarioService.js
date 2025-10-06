const Usuario = require("../models/usuarioModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// FALTARIA EL MANEJO DE ERRORES
async function getAllUsuarios() {
    const usuarios = await Usuario.find();
    return usuarios;
}

async function getUsuarioById(id) {
    const usuario = await Usuario.findById(id);
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

module.exports = {
    getAllUsuarios,
    getUsuarioById,
    getUsuarioByEmail,
    validatePassword,
    generateToken,
};