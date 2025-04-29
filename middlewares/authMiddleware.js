const jwt = require('jsonwebtoken');
const SECRET_KEY = 'tu_clave_secreta'; // Asegúrate de que coincida con la clave en authController.js

const verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) {
    return res.status(403).json({ error: 'No se proporcionó un token' });
  }

  // Extrae el token del formato Bearer <token>
  const bearerToken = token.split(' ')[1]; 
  jwt.verify(bearerToken, SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(500).json({ error: 'Fallo en la autenticación del token' });
    }
    req.userId = decoded.id;
    req.role = decoded.role; // Ahora también guardamos el rol del usuario
    next();
  });
};

module.exports = verifyToken;
