const User = require("../models/user");
const cloudinary = require("../utils/cloudinary");

// Obtener todos los usuarios
const getUsers = async (req, res) => {
  try {
    const users = await User.find().populate('products'); // o lo que relaciones
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error al obtener usuarios" });
  }
};

// Cambiar rol de un usuario (solo admin)
const changeRole = async (req, res) => {
  try {
    const { id } = req.params;
    const { role } = req.body;

    // Solo admins pueden cambiar rol
    if (req.user.role !== "admin") {
      return res.status(403).json({ msg: "No autorizado" });
    }

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ msg: "Usuario no encontrado" });
    }

    user.role = role;
    await user.save();

    res.status(200).json({ msg: `Rol actualizado a ${role}` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error al cambiar rol" });
  }
};

// Eliminar cuenta (propia o por admin)
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    // Permitir eliminar solo si:
    // - Es el propio usuario
    // - O es un admin
    if (req.user.id !== id && req.user.role !== "admin") {
      return res.status(403).json({ msg: "No autorizado para eliminar este usuario" });
    }

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ msg: "Usuario no encontrado" });
    }

    // Si tiene imagen, eliminarla de Cloudinary
    if (user.cloudinary_id) {
      await cloudinary.uploader.destroy(user.cloudinary_id);
    }

    await User.findByIdAndDelete(id);

    res.status(200).json({ msg: "Usuario eliminado correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error al eliminar usuario" });
  }
};

module.exports = {
  getUsers,
  changeRole,
  deleteUser,
};
//   getProduct,