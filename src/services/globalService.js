
/**
 * Realiza un 'soft delete' (borrado suave) en un documento de Mongoose.
 *  @param {object} Model - El modelo de Mongoose (Usuario, Review, Cancion, etc.).
 *  @param {string} id - El ID del documento a actualizar.
 *  @returns {Promise<object|null>} El documento actualizado o null si no se encontró.
 */
 async function softDelete(Model, id) {
    // Utiliza findByIdAndUpdate para una operación atómica
    const updatedDocument = await Model.findByIdAndUpdate(
        id, // ID del Objeto que vamos a actualizar
        { isDeleted: true }, // El campo que vamos a actualizar (flag de soft delete)
        { 
            // Opciones de configuración
            new: true,           // Devuelve el documento ya actualizado
            runValidators: false // Desactiva la validación de campos 'required', de esta forma no espera que se envien los campos obligatorios
        }
    );

    // Mongoose devuelve 'null' si no encuentra el ID.
    // No necesitamos reasignar, solo devolver el resultado.
    return updatedDocument;
}

/**
 * 
 * @param {object} documento - El documento de Mongoose (Usuario, Review, Cancion, etc.). 
 * @returns {boolean} Retorna true si está eliminado, false si no, null si no existe.
 */
function isDeleted(documento) {
    return documento.isDeleted;
}   

/**
 * Realiza un update en un documento de Mongoose siempre y cuando este no este eliminado (Soft Delete) y exista.
 *  @param {object} Model - El modelo de Mongoose (Usuario, Review, Cancion, etc.).
 *  @param {string} id - El ID del documento a actualizar.
 *  @param {object} data - Objeto con los campos a actualizar.
 *  @returns {Promise<object|null>} El documento actualizado o null si no se encontró.
 */

async function update(Model, id, data) {

    const documento = await Model.findById(id);
    // si el documento existe y si no esta eliminado, hacemos el update
    if (!documento){
        throw new Error(`${Model.modelName} no encontrad@ (ID: ${id})`);
    }    
    // Si el documento está marcado como eliminado, lanzamos un error
    if (await isDeleted(documento)) {
        throw new Error(`${Model.modelName} no esta disponible o ha sido eliminad@ (ID: ${id})`);
    }

    /*
    El método .set() funciona como una fusión (merge). Solo actualiza los campos que vienen en el objeto data. 
    Los campos que ya existían en documento pero que no vienen en data, se quedan exactamente como estaban.
    */
    documento.set(data); 
    console.log(`Actualizando ${Model.modelName} con ID ${id} con los datos:`, data);
    await documento.save();
    console.log(`${Model.modelName} con ID ${id} actualizado correctamente.`);
    return documento;
} 

// getDocuments se dividio en getDocuments y getDocument para mejorar la previsibilidad y el rendimiento

/**
 * Obtiene documentos de la base de datos según un filtro específico.
 * Siempre excluye las documentos marcadas como 'isDeleted: true'.
 *
 * @param {object} filtro - El objeto de filtro para MongoDB (ej: { autor_id: id }).
 * @param {object} Model - El Model de Mongoose (Usuario, Review, Cancion, etc.).
 * @returns {Promise<Array>} - Una promesa que resuelve a un array de documentos.
 */
async function getDocuments(Model, filtro) {
  try {
    // Combina el filtro proporcionado con el filtro base (isDeleted: false)
    // esparce filtro, usando "..." y le agrega la nueva propiedad isDeleted: false
    const query = { ...filtro, isDeleted: false };
    
    //Realiza la busqueda con el filtro correspondiente (ya contemplando el soft delete)
    const response = await Model.find(query);
    // log para ver el resultado | El JSON.stringify es para convertir el objeto en un string legible y poder concatenarlo
    console.log(`Documentos obtenidos de ${Model.modelName} con filtro ${JSON.stringify(filtro)}:`, response);
    return response;

    
  } catch (error) {
    // defino un mensaje de error generico para todos los modelos
    const mensajeError = `Error al obtener los documentos "${Model.modelName}" con los criterios (${JSON.stringify(filtro)}): \n`;

    console.error(mensajeError, error);
    throw new Error(`${mensajeError} \n Detalles: ${error.message}`);
  }
}

/**
 * Obtiene el primer (o unico) de la base de datos según un filtro específico.
 * Siempre excluye las reviews marcadas como 'isDeleted: true'.
 * usa findOne en lugar de find, dado que es mas eficaz cuando esperamos un solo resultado.
 *
 * @param {object} filtro - El objeto de filtro para MongoDB (ej: { autor_id: id }).
 * @param {object} Model - El Model de Mongoose (Usuario, Review, Cancion, etc.).
 * @returns {Promise<Array>} - Una promesa que resuelve a un array de reviews.
 */
async function getDocument(Model, filtro) {
  try {
    const query = { ...filtro, isDeleted: false };
    console.log(` \n\n\n Buscando UN documento de ${JSON.stringify(filtro)} \n\n\n`);
    // Usar findOne() devuelve un objeto o null
    const response = await Model.findOne(query); 
    
    // log para ver el resultado | El JSON.stringify es para convertir el objeto en un string legible y poder concatenarlo
    if  (!response){
      console.log(`No se encontró ningún documento ${Model.modelName} con filtro ${JSON.stringify(filtro)}`);
    } else {
      console.log(`Documento encontrado de ${Model.modelName} con filtro ${JSON.stringify(filtro)}:`, response);
    }
    //
    return response;
    
    // Maneja errores como por ejemplo, que el modelo no exista o la conexion a la DB falle, etc.
  } catch (error) {
     const mensajeError = `Error al obtener UN documento "${Model.modelName}" con criterios (${JSON.stringify(filtro)})`;
     console.error(mensajeError, error);
     throw new Error(`${mensajeError} \n Detalles: ${error.message}`);
  }
}

module.exports = {
    softDelete,
    isDeleted,
    update,
    getDocument,
    getDocuments,
};

