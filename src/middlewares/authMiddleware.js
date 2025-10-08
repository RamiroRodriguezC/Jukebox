const jwt = require('jsonwebtoken');

// Middleware para verificar el token JWT
const authenticateToken = (req, res, next) => {
  // Obtener el token del header Authorization (formato: Bearer <token>)
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Extraer token después de "Bearer "
    console.log("el token que llego aca es: " + token);
  if (!token) {
    return res.status(401).json({ error: 'Acceso denegado. Token no proporcionado.' });
  }

  // Verificar el token
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Token inválido o expirado.' });
    }

    // Agregar la información del usuario decodificada al request
    req.user = user;
    next(); // Continuar con la siguiente función
  });
};

const isAdmin = (req, res, next) => {
  if (req.user.rol !== 'admin') {
    return res.status(403).json({ error: 'Acceso denegado. Se requieren permisos de administrador.' });
  }
  next();
};


module.exports = {
    authenticateToken
};