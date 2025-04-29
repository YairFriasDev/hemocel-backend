const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../db/database'); // Ajusta la ruta si es necesario
const SECRET_KEY = 'tu_clave_secreta'; // Cambia esto por una clave segura

// Usuario administrador único
const adminUser = {
  username: 'admin',
  password: '$2b$08$K7j.GbQRKYbwag.j2PxUX.knYmXeuFTRmXxmOfdIrn6VJb3qTfYri' // Aquí usas la contraseña en hash
};

// Login de usuario (únicamente para el admin)
exports.login = (req, res) => {
  const { username, password } = req.body;

  // Verificamos si el nombre de usuario es el correcto
  if (username === adminUser.username) {
    // Verificamos la contraseña usando bcrypt
    bcrypt.compare(password, adminUser.password, (err, isMatch) => {
      if (err) return res.status(500).json({ error: 'Error en la comparación de contraseñas' });

      if (!isMatch) {
        return res.status(400).json({ error: 'Usuario o contraseña incorrectos' });
      }

      // Si las credenciales son correctas, generamos un token
      const token = jwt.sign(
        { username: adminUser.username, role: 'admin' }, 
        SECRET_KEY, 
        { expiresIn: '1h' } // 1 hora de expiración
      );

      return res.status(200).json({ message: 'Inicio de sesión exitoso', token });
    });
  } else {
    return res.status(400).json({ error: 'Usuario no encontrado' });
  }
};
