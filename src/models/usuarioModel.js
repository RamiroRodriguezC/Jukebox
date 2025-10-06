const mongoose = require("mongoose");

const usuarioSchema = new mongoose.Schema(
  {
    mail: { type: String, required: true, unique: true, trim: true},
    passwordHash: { type: String, required: true, default: "#FFFFFF" },
    username: {type: String, required: true, trim: true},
    //el enum deberia estar declarado afuera
    rol: { type: String, enum: ["admin", "user"], default: "user" },
    url_profile_photo: { type: String, default: "" },
    isDeleted : { type: Boolean, default: false },

        canciones_favoritas: {
        type: [{ // Define el array de objetos con esta estructura
            // Referencia a la Canción (ID para consultas profundas)
            _id: { 
                type: mongoose.Schema.Types.ObjectId, 
                ref: "Cancion", 
                required: true 
            },
            titulo: { type: String, required: true },

            // Datos desnormalizados para visualización rápida
            autor_nombre: { type: String, required: true },
            album_portada: { type: String, default: "" }
        }], 
        // Validador de Mongoose: Asegura que el array no tenga más de 4 elementos.
        validate: {
            validator: function(v) {
                return v.length <= 4;
            },
            message: props => `El array de canciones favoritas no puede exceder los 4 elementos (actual: ${props.value.length})`
        }
    }, 
  },
  { timestamps: true }
);

module.exports = mongoose.model("Usuario", usuarioSchema);