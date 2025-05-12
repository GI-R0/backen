const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const options = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    };

    await mongoose.connect(process.env.MONGO_URI, options);
    console.log("MongoDB conectado exitosamente");

    // Manejar eventos de conexión
    mongoose.connection.on('error', (err) => {
      console.error('Error de conexión a MongoDB:', err);
    });

    mongoose.connection.on('disconnected', () => {
      console.warn('MongoDB desconectado');
    });

    // Manejar señales de terminación
    process.on('SIGINT', async () => {
      await mongoose.connection.close();
      console.log('Conexión a MongoDB cerrada por terminación de la aplicación');
      process.exit(0);
    });

  } catch (error) {
    console.error('Error al conectar con MongoDB:', error);
    process.exit(1);
  }
};

module.exports = connectDB;
