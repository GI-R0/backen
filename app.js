const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// Importar rutas
const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');
const productRoutes = require('./routes/product.routes');

// Configurar app
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);

// Conexión a MongoDB y levantar servidor
const connectDB = require('./config/db.js'); // Import the connectDB function

// Conexión a MongoDB y levantar servidor
connectDB().then(() => {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
  });
});

// Exportar app para pruebas
module.exports = app;
