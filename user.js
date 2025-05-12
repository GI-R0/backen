const mongoose = require('mongoose');
const bcrypt = require('bcrypt'); // Importamos bcrypt para encriptar contraseñas

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { 
    type: String, 
    required: true, 
    unique: true,
    match: [/^\S+@\S+\.\S+$/, 'Por favor ingresa un email válido.'] // Validación de email
  },
  password: { type: String, required: true },
  role: { 
    type: String, 
    enum: ['user', 'admin'], 
    default: 'user' 
  },
  image: { type: String },
  relatedProducts: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Product' 
  }]
}, { timestamps: true }); // Añade createdAt y updatedAt automáticamente

// Middleware: Antes de guardar el usuario, encriptamos la contraseña si fue modificada
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next(); // Si el password no cambió, sigue

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt); // Hash de la contraseña
    next();
  } catch (err) {
    next(err);
  }
});

// Método para ocultar la contraseña al devolver el usuario como JSON
userSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

// Método para comparar contraseñas (por ejemplo en login)
userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
