const express = require("express");
const router = express.Router();
const { getUsers, changeRole, deleteUser } = require("../controllers/user.controller");
const authMiddleware = require("../middlewares/auth.middleware");

// Proteger rutas con autenticación
router.get("/", authMiddleware, getUsers);

// Cambiar rol de un usuario (solo admin)
router.put("/role/:id", authMiddleware, changeRole);

// Eliminar usuario (propio o por admin)
router.delete("/:id", authMiddleware, deleteUser);

module.exports = router;
