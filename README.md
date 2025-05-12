# Backend Server

Este proyecto es un servidor backend construido con Node.js y Express, que utiliza MongoDB como base de datos. Proporciona rutas para autenticación, gestión de usuarios y productos.

## 🚀 Tecnologías utilizadas

- Node.js
- Express.js
- MongoDB Atlas + Mongoose
- Cloudinary (subida de imágenes)
- Multer (middleware de subida de archivos)
- JSON Web Tokens (autenticación)
- Bcryptjs (hash de contraseñas)
- Dotenv (variables de entorno)
- Cors

## Requisitos

- Node.js (v14 o superior)
- MongoDB (local o en la nube)
- npm 

## 📦 Instalación

1. Clona el repositorio:
   ```bash
   git clone <URL_DEL_REPOSITORIO>
   cd backend-server
   ```

2. Instala las dependencias:
   ```bash
   npm install
   ```

3. Crea un archivo `.env` en la raíz del proyecto con las siguientes variables:
   ```
   PORT=5000
   MONGO_URI=tu_cadena_de_conexion_a_mongodb
   JWT_SECRET=tu_secreto_jwt
   ```

## Ejecución

Para iniciar el servidor, ejecuta:
```bash
node app.js
```

El servidor se ejecutará en `http://localhost:5000`.

## Rutas

### Autenticación
- **Registro**: `POST /api/auth/register`
- **Login**: `POST /api/auth/login`

### Usuarios
- **Obtener usuarios**: `GET /api/users`
- **Cambiar rol de usuario**: `PUT /api/users/role/:id`
- **Eliminar usuario**: `DELETE /api/users/:id`

### Productos
- **Crear producto**: `POST /api/products`
- **Obtener productos**: `GET /api/products`
- **Obtener un producto específico**: `GET /api/products/:id`
- **Actualizar producto**: `PUT /api/products/:id`
- **Eliminar producto**: `DELETE /api/products/:id`

## Pruebas

Puedes probar las rutas utilizando herramientas como Postman o Insomnia. Asegúrate de incluir los headers necesarios, como el token de autenticación, cuando sea requerido.

## Contribución

Si deseas contribuir al proyecto, por favor sigue estos pasos:
1. Haz un fork del repositorio.
2. Crea una rama para tu nueva funcionalidad (`git checkout -b feature/nueva-funcionalidad`).
3. Haz commit de tus cambios (`git commit -m 'Añadir nueva funcionalidad'`).
4. Haz push a la rama (`git push origin feature/nueva-funcionalidad`).
5. Abre un Pull Request.

## Licencia

Este proyecto está licenciado bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.

---

## 🚀 Tecnologías utilizadas

- Node.js
- Express.js
- MongoDB Atlas + Mongoose
- Cloudinary (subida de imágenes)
- Multer (middleware de subida de archivos)
- JSON Web Tokens (autenticación)
- Bcryptjs (hash de contraseñas)
- Dotenv (variables de entorno)
- Cors

---

## 📦 Instalación

1. Clona el repositorio:

```bash
git clone https://github.com/tu_usuario/tu_repositorio.git
