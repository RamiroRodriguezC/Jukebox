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
  // 1. Destructuramos las variables correctas del objeto 'data'.
  // Basicamente agarra como ese diccionario que vino el req.body y le asigna los valores a las variables correspondientes
  const {mail, password, username, rol, url_profile_photo} = data;

  // 2. Validamos que los campos obligatorios estén presentes. En caso contrario, lanzamos un error.
  if (!mail || !password || !username || !rol) {
    const error = new Error("Faltan campos obligatorios...");
    error.statusCode = 400; // Asignamos un código de estado al error
    throw error; // ¡Lanzamos el error!
  }

  // 3. Hasheamos la contraseña antes de guardarla
    const saltRounds = 12; 
    // número de veces que la función de hash se aplica a una contraseña. 
    const passwordHash = await bcrypt.hash(password, saltRounds);
    // 4. Construimos el objeto de la review con los datos desnormalizados
    // los que estan solos es por que su key y es igual a su valor y se puede abreviar asi.
  const userData = {
    mail,           // mail : mail
    passwordHash,   // passwordHash : passwordHash
    username,       // username : username
    rol,            // rol : rol
    //isDeleted se agregara como default false
  };

  // 5. Agregamos los campos opcionales, si fueron proporcionados
  //por ahora solo es el url_profile_photo
  if (url_profile_photo !== undefined) userData.url_profile_photo = url_profile_photo;

  // 6. Creamos y guardamos la nueva review en la base de datos
  const nuevaUsuario = await Usuario.create(userData);

  return nuevaUsuario;
}

async function updateUsuario(id, data){
    // Si se proporciona una nueva contraseña, hashearla antes de actualizar
    data.passwordHash = data.password ? await bcrypt.hash(data.password, 12) : undefined;
    // Reutilizamos la función genérica de 'update' del servicio global
    return await globalService.update(Usuario, id, data);
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
    updateUsuario,
    deleteUsuario,
};