const mongoose = require("mongoose");

const cancionSchema = new mongoose.Schema(
  {
    titulo: { type: String, required: true, trim: true},
    duracion: { type: Number, required: true }, // Duracion en segundos
    generos: { type: [String], default: [] },
    fecha_salida: { type: Date, default: null },
    isDeleted : { type: Boolean, default: false },

    // *** CAMBIO: Desnormalización del Álbum (título y portada) ***
    album: {
        _id: { type: mongoose.Schema.Types.ObjectId, ref: "Album", required: true },
        titulo: { type: String, required: true },
        url_portada: { type: String, default: "" }, // Para mostrar la carátula sin consultar el álbum
    },

    // *** CAMBIO: Desnormalización del Artista (nombre) ***
    autor: {
        _id: { type: mongoose.Schema.Types.ObjectId, ref: "Artista", required: true },
        nombre: { type: String, required: true } // Para mostrar la canción con su artista
    }

  },
  { 
    timestamps: true ,
    collection: 'canciones' 
    //hubo que agregar colecction : 'canciones' porque sino mongoose
    //creaba la coleccion 'cancions' por el pluralizer.
  }
);

// Índice de texto completo para búsquedas eficientes
cancionSchema.index(
    { 
      // Campos a indexar para búsqueda de texto completo
        titulo: 'text', 
        'album.titulo': 'text',
        'autor.nombre': 'text' 
    }, 
    { 
        // peso/jerarquia de los campos (va a priorizar las coincidencias en titulo, decreciendo
        // hacia el menor peso)
        weights: { 
            titulo: 3,
             'album.titulo': 2,
            'autor.nombre': 1 
        },
        
         default_language: 'spanish', // Configura el idioma para la tokenización y stemming
        name: 'fullTextSearchIndex'   // Nombre del índice
    }
);
/* Indexación Inteligente (Paso Previo): Cuando creas un índice de texto, MongoDB:

Tokeniza: Divide el texto en palabras individuales.

Normaliza: Ignora mayúsculas/minúsculas (CAnciOn se vuelve cancion).

Stemming (Radicación): Reduce las palabras a su raíz lingüística (ej: "corriendo", "corrió", "corren" se reducen a la raíz corr-).

Filtra: Ignora palabras vacías (stop words), como "el", "la", "un", "y", que no aportan valor a la búsqueda.
*/
module.exports = mongoose.model("Cancion", cancionSchema);