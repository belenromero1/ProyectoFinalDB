const express = require('express');
const router = express.Router();
const connection = require('../db.js');


router.get('/', (req, res) => {
  const selectQuery = 'SELECT * FROM carrito';

  connection.query(selectQuery, (err, results) => {
    if (err) {
      console.error('Error al obtener el carrito:', err);
      res.send('Error al obtener el carrito');
      return;
    }

    res.render('carrito', { productos: results });
  });
});

router.get('/total', (req, res) => {
  const selectSumQuery = 'SELECT SUM(precioTotal) AS total FROM carrito';
  connection.query(selectSumQuery, (err, result) => {
    if (err) {
      console.error('Error al obtener la suma de precios totales:', err);
      res.status(500).json({ error: 'Hubo un error al obtener la suma de precios totales' });
      return;
    }

    const totalCarrito = result[0].total;
    res.json({ totalCarrito });
  });
});


router.post('/actualizar/:id', (req, res) => {
  const productoId = req.params.id;
  const nuevaCantidad = req.body.cantidad;

  const selectQuery = 'SELECT * FROM carrito WHERE id = ?';
  connection.query(selectQuery, [productoId], (err, results) => {
    if (err) {
      console.error('Error al obtener el producto del carrito:', err);
      res.status(500).json({ error: 'Hubo un error al obtener el producto del carrito' });
      return;
    }

    if (results.length === 0) {
      res.status(404).json({ error: 'El producto no existe en el carrito' });
      return;
    }

    const precioUnitario = results[0].precio;
    const precioTotal = nuevaCantidad * precioUnitario;

    const updateQuery = 'UPDATE carrito SET cantidad = ?, precioTotal = ? WHERE id = ?';
    connection.query(updateQuery, [nuevaCantidad, precioTotal, productoId], (err) => {
      if (err) {
        console.error('Error al actualizar la cantidad y el precio total del producto en el carrito:', err);
        res.status(500).json({ error: 'Hubo un error al actualizar la cantidad y el precio total del producto en el carrito' });
        return;
      }

      res.json({ message: 'El producto se actualizo correctamente' });
    });
  });
});


// Ruta para eliminar un producto del carrito
router.post('/eliminar/:id', (req, res) => {
  const productoId = req.params.id;

  const deleteQuery = 'DELETE FROM carrito WHERE id = ?';
  connection.query(deleteQuery, [productoId], (err) => {
    if (err) {
      console.error('Error al eliminar el producto del carrito:', err);
      res.status(500).json({ error: 'Hubo un error al eliminar el producto del carrito' });
      return;
    }

    res.json({ message: 'El producto se ha eliminado correctamente del carrito' });
  });

  router.post('/compra', (req, res) => {
    res.redirect('compra');
  });
});

module.exports = router;

