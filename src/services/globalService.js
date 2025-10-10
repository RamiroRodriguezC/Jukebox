
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


module.exports = {
    softDelete,
};