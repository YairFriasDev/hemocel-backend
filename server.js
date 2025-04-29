const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 5001;

const authRoutes = require('./routes/authRoutes'); // Rutas de autenticación
const inventoryRoutes = require('./routes/inventoryRoutes'); // Rutas de inventarios
const verifyToken = require('./middlewares/authMiddleware'); // Middleware para verificar el token

// Middlewares
app.use(express.json());
app.use(bodyParser.json());
app.use(cors());

// Rutas de autenticación (NO protegidas por verifyToken)
app.use('/api/auth', authRoutes);  // Aquí no necesitas el middleware de verificación

// Rutas protegidas para administración de inventarios (requiere autenticación)
app.use('/api', verifyToken, inventoryRoutes); // Solo las rutas de inventarios están protegidas por verifyToken

// Ruta de prueba
app.get('/', (req, res) => {
  res.send('API funcionando correctamente');
});

// Servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto ${port}`);
});
