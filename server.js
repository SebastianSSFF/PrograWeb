// backend/server.js
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// Configuración de la conexión a MySQL
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  port: "3307",
  database: 'el_garage_db'
});

// Conectar a MySQL
db.connect((err) => {
  if (err) throw err;
  console.log('Conectado a la base de datos MySQL');
});

// Ruta de ejemplo para obtener productos
app.get('/api/productos', (req, res) => {
  db.query('SELECT * FROM productos', (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// Iniciar el servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor backend corriendo en http://localhost:${PORT}`);
});