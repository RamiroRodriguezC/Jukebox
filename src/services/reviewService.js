const  Review  =  require("../models/reviewModel");
const  Cancion = require("../models/cancionModel");
const  Usuario = require("../models/usuarioModel");
const  Album   = require("../models/albumModel");
const globalService = require("./globalService");

console.log("MODELO ALBUM EN REVIEWSERVICE:", Album); 
//MAPA DE MODELOS RESEÑABLES
const modelosResenables = {
  // Es lo mismo que 'Cancion': Cancion, cuando la key y el valor tienen el mismo nombre se puede abreviar asi
  Cancion, 
  Album,
};

// FALTARIA EL MANEJO DE ERRORES
async function getAllReviews() {
    const reviews = await Review.find({isDeleted : false});
    return reviews;
}

async function getReviewById(id) {
  console.log("ID recibido en el SERVICIO:", `'${id}'`);
  
  const reviews = await Review.findOne({ _id: '671801a0000000000000012c', isDeleted: false });

  // --- AÑADE ESTE LOG PARA VER EL RESULTADO ---
  console.log("asdasdasdsadasd");
  console.log("Resultado de la consulta:", reviews);

  return reviews;
}

async function createReview(data){
  // 1. Destructuramos las variables correctas del objeto 'data'.
  const {rating, like, comentario, entidad_tipo, autor_id, entidad_id} = data;

  // 2. Validamos que los campos obligatorios estén presentes. En caso contrario, lanzamos un error.
  if (!rating || !entidad_tipo || !entidad_id || !autor_id) {
    const error = new Error("Faltan campos obligatorios...");
    error.statusCode = 400; // Asignamos un código de estado al error
    throw error; // ¡Lanzamos el error!
  }

  // 3. Verificamos que 'entidad_tipo' sea válido y obtenemos el modelo correspondiente.
  // Si tipoEntidad no existe como llave en el mapa, ModeloEntidad será 'undefined'.
  const ModeloEntidad = modelosResenables[entidad_tipo];
  if (!ModeloEntidad) {
    const error = new Error(`El tipo de entidad '${entidad_tipo}' no es válido.`);
    error.statusCode = 400;
    throw error;
  }

  
  // 4. Buscamos la entidad y el autor en paralelo para más eficiencia
  const [entidad, autor] = await Promise.all([
    ModeloEntidad.findOne({_id : entidad_id, isDeleted : false}), // .lean() hace la consulta más rápida porque devuelve un objeto JS simple
    Usuario.findOne({_id : autor_id, isDeleted : false})
  ]);
  
  // 5. Validamos que ambos existan
  if (!entidad) {
     const error = new Error(`La entidad de tipo '${entidad_tipo}' no fue encontrada.`);
      error.statusCode = 404;
      throw error;
  }
  if (!autor) {
     const error = new Error(`No se encontro el auto con ID '${autor_id}'.`);
      error.statusCode = 404;
      throw error;
  }

  // 6. Construimos el objeto de la review con los datos desnormalizados
  // los que estan solos es por que su key y es igual a su valor y se puede abreviar asi.
  const reviewData = {
    rating,
    entidad_tipo,
    entidad_id, // Guardamos la referencia real
    like,
    //isDeleted se agregara como default false
    // Incrustamos los datos del autor
    autor: {
      _id: autor._id,
      username: autor.username,
      url_profile_photo: autor.url_profile_photo || ""
    },

    // Incrustamos los datos de la entidad
    entidad_info: {
      titulo: entidad.titulo,
      // NOTA: Asumimos que tanto Cancion como Album tienen una estructura similar para obtener el nombre del artista y la portada.
      // Si la estructura es diferente, aquí necesitarías un 'if (entidad_tipo === 'Cancion') { ... }'.
      autor_nombre: entidad.artista_nombre || "Desconocido", // Asegúrate de que este campo exista en tus modelos
      url_portada: entidad.url_portada || ""
    }
  };

  // 7. Agregamos los campos opcionales, si fueron proporcionados
  //por ahora solo es el comentario
  if (comentario !== undefined) reviewData.comentario = comentario;

  // 8. Creamos y guardamos la nueva review en la base de datos
  const nuevaReview = await Review.create(reviewData);

  return nuevaReview;
}

// FALTA IMPLEMENTAR FILTRO POR isDeleted
// FALTA IMPLEMENTAR FILTRO DE CAMPOS MODIFICABLES
async function updateReview(id,data){
    // Reutilizamos la función genérica de 'update' del servicio global
      return await globalService.update(Review, id, data);
}

async function deleteReview(id){
    // Reutilizamos la función genérica de 'soft delete' del servicio global
      return await globalService.softDelete(Review, id);
}

module.exports = {
    getAllReviews,
    getReviewById,
    createReview,
    updateReview,
    deleteReview,
};