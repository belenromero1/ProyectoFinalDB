const express = require('express');
const router = express.Router();
const connection = require('../db.js');


router.get('/', (req, res) => {
  res.render('compra');
});


router.post('/', (req, res) => {
  const { nombre_cliente, tarjeta, fecha_tarjeta, codigo_seguridad, direccion, altura, localidad, codigo_postal } = req.body;

  if (!nombre_cliente || !tarjeta || !fecha_tarjeta || !codigo_seguridad || !direccion || !altura || !localidad || !codigo_postal) {

    return;
  }

  const insertQuery = 'INSERT INTO compra (nombre_cliente, tarjeta, fecha_tarjeta, codigo_seguridad, direccion, altura, localidad, codigo_postal) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
  const values = [nombre_cliente, tarjeta, fecha_tarjeta, codigo_seguridad, direccion, altura, localidad, codigo_postal];

  try {
    connection.query(insertQuery, values, (err, result) => {
      if (err) {
        console.error('Error al guardar la compra:', err);
        res.status(500).json({ error: 'Hubo un error al guardar la compra' });
        return;
      }

      res.redirect('/compra/confirmacion');
      console.log('Compra guardada exitosamente');
    });
  } catch (err) {
    console.error('Error al ejecutar la consulta SQL:', err);
    res.status(500).json({ error: 'Hubo un error al guardar la compra' });
  }
});



router.get('/confirmacion', (req, res) => {
  const mensaje = '¡Compra realizada con éxito!';
  res.render('confirmacion', { mensaje });
});



module.exports = router;
