const usuarioService = require("../services/usuarioService");

async function getAll(req, res) {
  try {
    const usuarios = await usuarioService.getAllUsuarios();
    res.json(usuarios);
  } catch (err) {
    res.status(500).json({ error: "Error al obtener Usuarios" });
  }
};

async function getById(req, res) {
  const id = req.params.id;
  try {
    const usuarios = await usuarioService.getUsuarioById(id);
    res.json(usuarios);
  } catch (err) {
    res.status(500).json({ error: "Error al obtener el artista" });
  }
};

//SI HAY TIEMPO CAMBIAR TODAS LAS DECLARACIONES DE FUNCIONES A ESTA FORMA
/*  Esta forma de declarar es el estandar moderno (segun gemini), 
    pero el async function getById(req, res) 
    { ... } es igualmente valido.
*/ 

const login = async (req, res) => {
  try {
    // PASO 1
    // Extraer email y password del body
    const { mail, password } = req.body;
    console.log(`La contraseña aca en el login, dentro del controller es: ` + password);
    // Buscar usuario por email

    // PASO 2 -> VALIDAR CREDENCIALES (MAIL)
    //Service
    const usuario = await usuarioService.getUsuarioByEmail(mail); 
    if (!usuario) {
      return res.status(400).json({ error: "Usuario no encontrado" });
    } 
    //

    // PASO 2 -> Validar credenciales (CONTRASEÑA)
    // Service
    // Verificar contraseña (comparar con hash)
    const isMatch = await usuarioService.validatePassword(password, usuario);
    if (!isMatch) {
      return res.status(400).json({ error: "Contraseña incorrecta" });
    }
    //

    // Generar token JWT
    const token = usuarioService.generateToken(usuario);

    res.json({
      message: "Login exitoso",
      token, //PASO 4
      usuario: {
        id: usuario._id,
        nombre: usuario.username,
        mail: usuario.mail,
        rol: usuario.rol,
      },
    });
  } catch (err) {
    console.error("Error en login:", err);
    res.status(500).json({ error: "Error en el servidor" });
  }
};

module.exports = {
    getAll,
    getById,
    login,
};