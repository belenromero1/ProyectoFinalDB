const express = require('express');
const hbs = require('hbs')
const app = express();
const productosRoutes = require('./routes/productosRoutes');
const carritoRoutes = require('./routes/carrito');
const compraRoutes = require('./routes/compra');




app.use(express.static(__dirname + '/public'));
app.set("view engine", "hbs");
hbs.registerPartials(__dirname + "/views/partials/")


app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.render('index');
});

app.use('/productos', productosRoutes);
app.use('/carrito', carritoRoutes);
app.use('/compra', compraRoutes);


port = 3004;
app.listen(port, () => {
  console.log(`Usando el puerto http://localhost:${port}`);
});