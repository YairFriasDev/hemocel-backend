const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');
const path = require('path');

// ✅ Ruta persistente en Render
const dbPath = '/data/hemocel.db';
const dbDir = path.dirname(dbPath);

// ✅ Crear carpeta /data si no existe (solo cuando es necesario)
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
  console.log('📁 Carpeta /data creada para almacenamiento persistente');
}

// ✅ Conexión a la base
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
    `, (err) => {
      if (err) console.error('⚠️ Error creando tabla inventory:', err.message);
      else console.log('📦 Tabla inventory lista.');
    });

    db.run(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        role TEXT NOT NULL DEFAULT 'user'
      )
    `, (err) => {
      if (err) console.error('⚠️ Error creando tabla users:', err.message);
      else console.log('👥 Tabla users lista.');
    });
  }
});

module.exports = db;
