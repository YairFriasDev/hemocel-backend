const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');

// Ruta persistente de Render
const dbPath = '/data/hemocel.db';

// Verificar que /data existe
if (!fs.existsSync('/data')) {
  fs.mkdirSync('/data', { recursive: true });
  console.log('🗂️ Carpeta /data creada manualmente');
}

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('❌ Error al conectar con la base de datos persistente:', err.message);
  } else {
    console.log('✅ Conectado a la base de datos persistente:', dbPath);

    db.run(`
      CREATE TABLE IF NOT EXISTS inventory (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nombre TEXT,
        cantidad INTEGER,
        caducidad DATE
      )
    `);

    db.run(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        role TEXT NOT NULL DEFAULT 'user'
      )
    `);
  }
});

module.exports = db;
