const Usuario = require("../models/usuarioModel");
const Review = require("../models/reviewModel");
const Cancion = require("../models/cancionModel");
const globalService = require("./globalService");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


async function getAllUsuarios() {
    const usuarios = await globalService.getDocuments(Usuario);
    return usuarios;
}
// Devuelve un array con el usuario que tiene el id pasado por parametro
async function getUsuarioById(id) {
  try {
    const usuarios = await globalService.getDocument(Usuario, { _id: id });
    return usuarios;
  } catch (error) {
    throw new Error(error);
  }
}

// Devuelve el usuario que tiene el mail pasado por parametro (al ser unique, solo habra uno o ninguno)
async function getUsuarioByEmail(mail) {
    try {
      const usuario = await globalService.getDocument(Usuario, { mail: mail });
      return usuario;
  } catch (error) {
    throw new Error(error);
  }
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
        rol: usuario.rol
    }

    return jwt.sign(
      payload,
      process.env.JWT_SECRET, // Ver .env o variable de entorno en produccion
      { expiresIn: "3000000" } // 30 seg. para probar. Para que expire en 1 hora, colocar '1h'
    );
}

async function addFavorito(idUser, idCancion) {
  const usuario = await globalService.getDocument(Usuario,{_id : idUser});

  // Traer la canción para obtener los datos
  const cancion = await globalService.getDocument(Cancion, {_id : idCancion});

  // Asegurarse de que favoritos sea un array
  if (!usuario.canciones_favoritas) {
    usuario.canciones_favoritas = [];
  }

  // Evitar duplicados comparando _id
  const yaExiste = usuario.canciones_favoritas.some(fav => fav._id.equals(idCancion));
  if (!yaExiste) {
    usuario.canciones_favoritas.push({
      _id: idCancion,
      titulo: cancion.titulo,
      autor_nombre: cancion.autor_nombre || "Desconocido",
      album_portada: cancion.album_portada || ""
    });
    await usuario.save();
  }

  return usuario;
}

async function deleteFavorito(idUser, idCancion) {
  const usuario = await globalService.getDocument(Usuario, {_id : idUser});
console.log("Usuario antes de eliminar favorito:", usuario);
  usuario.canciones_favoritas = usuario.canciones_favoritas.filter(
    fav => fav._id.toString() !== idCancion
  );

  await usuario.save();

  return usuario;
}

async function createUsuario(data){
  // 1. Destructuramos las variables correctas del objeto 'data'.
  // Basicamente agarra como ese diccionario que vino el req.body y le asigna los valores a las variables correspondientes
  const {mail, password, username, rol, url_profile_photo} = data;

  // 2. Validamos que los campos obligatorios estén presentes. En caso contrario, lanzamos un error.
  if (!mail || !password || !username || !rol) {
    console.log("campos recibidos:" , mail, password, username, rol);
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
    try {
      // Si se proporciona una nueva contraseña, hashearla antes de actualizar
      if (data.password) data.passwordHash = await bcrypt.hash(data.password, 12);
      delete data.password; // Eliminar el campo 'password' para evitar guardarlo directamente

      // Reutilizamos la función genérica de 'update' del servicio global
      const usuarioActualizado = await globalService.update(Usuario, id, data);

      // Si el await da error rompe y esto no se ejecuta
      const dataToSync = {};

      // Si username y profilePhoto da Thruty (osea que no es null, undefined, false, 0 o cadena vacia) 
      // los agregamos al objeto dataToSync para actualizar las reviews.
      if (data.username) dataToSync["autor.username"] = data.username ;
      
      if (data.url_profile_photo) dataToSync["autor.url_profile_photo"] = data.url_profile_photo ;

      if (Object.keys(dataToSync).length > 0) {
            await Review.updateMany(
                { "autor._id": id },  // Filtro (Las que coincidan con el autor.id)
                // el set es para que no borro o toque otros campos que no quiero actualizar
                { $set: dataToSync } // Update (los campos a actualizar) 
            );
      }

      return usuarioActualizado;

    // Reutilizamos la función genérica de 'update' del servicio global
    }catch (error) {
        throw error;
    }
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
    addFavorito,
    deleteFavorito,
};