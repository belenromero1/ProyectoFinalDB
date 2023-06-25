// productosRoutes.js

const express = require('express');
const router = express.Router();
const connection = require('../db');


router.get('/', (req, res) => {
  const selectQuery = 'SELECT * FROM productos';

  connection.query(selectQuery, (err, results) => {
    if (err) {
      console.error('Error al obtener los productos:', err);
      res.send('Error al obtener los productos');
      return;
    }

    res.render('productos', { productos: results });
  });
});

router.post('/agregar-al-carrito/:id', (req, res) => {
  const productoId = req.params.id;


  const selectQuery = 'SELECT * FROM productos WHERE id = ?';
  connection.query(selectQuery, [productoId], (err, results) => {
    if (err) {
      console.error('Error al obtener los datos del producto:', err);
      res.send('Error al obtener los datos del producto.');
      return;
    }


    const insertQuery = 'INSERT INTO carrito (nombre, imagen, precio ,cantidad, precioTotal ) VALUES (?, ?, ?, ?, ?)';
    const { nombre, imagen, precio } = results[0];
    const cantidad = 1;
    const precioTotal = precio * cantidad;

    connection.query(insertQuery, [nombre, imagen, precio, cantidad, precioTotal], (err) => {
      if (err) {
        console.error('Error al agregar el producto al carrito:', err);
        res.send('Error al agregar el producto al carrito.');
        return;
      }

      res.send('El producto se ha agregado al carrito correctamente.');
    });
  });
});

module.exports = router;
