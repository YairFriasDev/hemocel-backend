const express = require('express');
const router = express.Router();
const db = require('../db/database');
const verifyToken = require('../middlewares/authMiddleware');

// Obtener todos los materiales
router.get('/materiales', verifyToken, (req, res) => {
    db.all('SELECT * FROM inventory', [], (err, rows) => {
        if (err) {
            return res.status(400).json({ error: err.message });
        }
        res.json(rows);
    });
});

// Agregar nuevo material
router.post('/materiales', verifyToken, (req, res) => {
    const { nombre, cantidad, caducidad } = req.body;
    db.run(
        `INSERT INTO inventory (nombre, cantidad, caducidad) VALUES (?, ?, ?)`,
        [nombre, cantidad, caducidad],
        function (err) {
            if (err) {
                return res.status(400).json({ error: err.message });
            }
            res.json({ id: this.lastID });
        }
    );
});

// Eliminar material
router.delete('/materiales/:id', verifyToken, (req, res) => {
    const { id } = req.params;

    db.run(`DELETE FROM inventory WHERE id = ?`, [id], function (err) {
        if (err) {
            console.error('Error al eliminar material:', err.message);
            return res.status(500).json({ error: 'Error al eliminar material' });
        }

        res.json({ message: 'Material eliminado correctamente' });
    });
});

// Editar material
router.put('/materiales/:id', verifyToken, (req, res) => {
    const { id } = req.params;
    const { nombre, cantidad, caducidad } = req.body;

    db.run(
        `UPDATE inventory SET nombre = ?, cantidad = ?, caducidad = ? WHERE id = ?`,
        [nombre, cantidad, caducidad, id],
        function (err) {
            if (err) {
                console.error('Error al actualizar material:', err.message);
                return res.status(500).json({ error: 'Error al actualizar material' });
            }

            res.json({ message: 'Material actualizado correctamente' });
        }
    );
});

module.exports = router;
