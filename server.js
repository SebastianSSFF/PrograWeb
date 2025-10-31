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
  password: '',
  port: 3306,
  database: 'mexicartas_db'
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
const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Servidor backend corriendo en http://localhost:${PORT}`);
});


app.post('/api/recibo', (req, res) => {
  const { total, metodo_pago, estado } = req.body;

  if (!total) {
    return res.status(400).json({ mensaje: 'Falta el total del recibo' });
  }

  const q = 'INSERT INTO recibo_compra (total, metodo_pago, estado) VALUES (?, ?, ?)';
  db.query(q, [total, metodo_pago || 'PayPal', estado || 'Pagado'], (err, result) => {
    if (err) {
      console.error('Error al registrar el recibo:', err);
      return res.status(500).json({ mensaje: 'Error al registrar el recibo' });
    }
    res.status(200).json({ mensaje: 'Recibo registrado correctamente', id: result.insertId });
  });
});
