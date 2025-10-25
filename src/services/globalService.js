
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
async function isDeleted(documento) {
    return documento.isDeleted;
}   

/**
 * Realiza un update en un documento de Mongoose.
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

    documento.set(data); // Actualizamos la variable en memoria (con los nuevos datos)
    console.log(`Actualizando ${Model.modelName} con ID ${id} con los datos:`, data);
    await documento.save();
    console.log(`${Model.modelName} con ID ${id} actualizado correctamente.`);
    return documento;
} 

module.exports = {
    softDelete,
    isDeleted,
    update,
};

