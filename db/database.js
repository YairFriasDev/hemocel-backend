const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');
const path = require('path');

// ✅ Ruta persistente en Render
const dbPath = '/data/hemocel.db';

// 🧠 Verificar si el archivo no existe y crearlo vacío
if (!fs.existsSync(dbPath)) {
  fs.writeFileSync(dbPath, '');
  console.log('🆕 Archivo hemocel.db creado en /data');
}

// ✅ Conexión a la base de datos persistente
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('❌ Error al conectar con la base de datos persistente:', err.message);
  } else {
    console.log('✅ Conectado a la base de datos persistente:', dbPath);

    // Crear tabla de inventario
    db.run(`
      CREATE TABLE IF NOT EXISTS inventory (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nombre TEXT,
        cantidad INTEGER,
        caducidad DATE
      )
    `, (err) => {
      if (err) console.error('⚠️ Error creando tabla inventory:', err.message);
      else console.log('📦 Tabla inventory verificada o creada.');
    });

    // Crear tabla de usuarios
    db.run(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        role TEXT NOT NULL DEFAULT 'user'
      )
    `, (err) => {
      if (err) console.error('⚠️ Error creando tabla users:', err.message);
      else console.log('👥 Tabla users verificada o creada.');
    });
  }
});

module.exports = db;
