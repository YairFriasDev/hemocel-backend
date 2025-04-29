const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Login del usuario administrador
router.post('/login', authController.login);

module.exports = router;
