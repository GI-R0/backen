const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Registrar usuario
const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validar que no exista el usuario
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ msg: "El usuario ya existe" });
    }

    // Encriptar contraseña
    const salt = bcrypt.genSaltSync();
    const hashedPassword = bcrypt.hashSync(password, salt);

    // Crear usuario
    const user = new User({
      name,
      email,
      password: hashedPassword,
      role: "user", // Siempre por defecto "user"
    });

    await user.save();

    // Crear token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(201).json({
      user,
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error en el registro" });
  }
};

// Login usuario
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Verificar que exista el usuario
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: "Credenciales inválidas" });
    }

    // Verificar contraseña
    const validPassword = bcrypt.compareSync(password, user.password);
    if (!validPassword) {
      return res.status(400).json({ msg: "Credenciales inválidas" });
    }

    // Crear token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(200).json({
      user,
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error en el login" });
  }
};

module.exports = {
  register,
  login,
};
// const User = require("../models/User");