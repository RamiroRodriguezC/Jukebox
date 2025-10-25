
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
 * Realiza un update en un documento de Mongoose.
 *  @param {object} Model - El modelo de Mongoose (Usuario, Review, Cancion, etc.).
 *  @param {string} id - El ID del documento a actualizar.
 *  @param {object} data - Objeto con los campos a actualizar.
 *  @returns {Promise<object|null>} El documento actualizado o null si no se encontró.
 */
async function update(Model, id, data) {

    // Buscar el documento por ID
    const modeloActualizado = await Model.findById(id);

    // Si no se encuentra, lanzar un error
    if (!modeloActualizado) {
        throw new Error(`${Model.modelName} no encontrad@`);
    }
    
    // Actualizar solo los campos proporcionados en 'data', si por ejemplo no vino el username, no lo actualizamos
    for (const key in data) {
        console.log(`Procesando campo: ${key} con valor: ${data[key]}`);
        if (!(data[key] == undefined)){ // Saltar campos undefined
            modeloActualizado[key] = data[key];
        }
    }

    // Guardar los cambios en la base de datos
    await modeloActualizado.save();
    
    // Devolver el documento actualizado
    return modeloActualizado;
}

module.exports = {
    softDelete,
    update,
};

