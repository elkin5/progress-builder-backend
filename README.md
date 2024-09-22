# Gestión de obras de construcción
### Tecnología
Nodejs con Express

### Librerias:
- express: para exponer api rest
- pg: Cliente de PostgreSQL para Node.js.
- bcryptjs: Librería para encriptar y comparar contraseñas.
- jsonwebtoken: Librería para manejar tokens JWT para autenticación.
- body-parser: Middleware para analizar cuerpos de solicitud.
- sequelize: ORM
- pg-hstore: Manejo de clave valor en un campo postgres

### Estructura de Archivos del Proyecto
```
📦 progress-builder-backend  
├── 📁 dist  
├── 📁 node_modules  
├── 📁 scripts  
├── 📁 src  
│   ├── 📁 __tests__  
│   │   ├── 📁 database  
│   │   └── 📁 user  
│   ├── 📁 api  
│   │   └── 📝 router.js  
│   ├── 📁 config  
│   │   ├── 📝 corsConfig.js  
│   │   └── 📝 sequelize.js  
│   ├── 📁 domain  
│   │   ├── 📁 client  
│   │   │   ├── 📝 registerClient.js  
│   │   │   ├── 📝 updateClient.js  
│   │   │   ├── 📝 listClients.js  
│   │   │   └── 📝 deleteClient.js  
│   │   └── 📁 user  
│   │       ├── 📝 registerUser.js  
│   │       ├── 📝 updateUser.js  
│   │       ├── 📝 listUsers.js  
│   │       ├── 📝 deleteUser.js  
│   │       ├── 📝 loginUser.js  
│   │       └── 📝 getUserById.js  # Nuevo archivo para obtener usuario por ID
│   ├── 📁 repository  
│   │   ├── 📝 Client.js  
│   │   └── 📝 User.js  
│   └── 📝 app.js  
├── 📝 .dockerignore  
├── 📝 .env  
├── 📝 .env.test  
├── 📝 .gitignore  
├── 🐳 Dockerfile  
├── 📝 package.json  
├── 🔒 package-lock.json  
├── 📖 README.md  
└── 🧩 webpack.config.js
```

### Api Rest
#### Documentación con postman
https://documenter.getpostman.com/view/7107972/2sAXjRW9ph

### Despliegue PDN
url = https://progress-builder-backend-production.up.railway.app/api

### Resumen de los Endpoints de la API de usuarios

| Método HTTP | Ruta                  | Descripción                                               | Ejemplo de Uso                                                                                                                                           |
|-------------|-----------------------|-----------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------|
| **POST**    | `/api/users/register` | Registra un nuevo usuario en el sistema.                  | Cuerpo: `{ "name": "Juan", "email": "juan@example.com", "password": "123456", "phone": "123456789", "identification": "12345678", "position": "admin" }` |
| **POST**    | `/api/users/login`    | Autentica a un usuario existente y devuelve un token JWT. | Cuerpo: `{ "email": "juan@example.com", "password": "123456" }`                                                                                          |
| **GET**     | `/api/users`          | Lista todos los usuarios registrados en el sistema.       | N/A                                                                                                                                                      |
| **PUT**     | `/api/users/:id`      | Actualiza la información de un usuario existente por ID.  | Cuerpo: `{ "name": "Juan Actualizado", "email": "juan.updated@example.com", "phone": "987654321", "identification": "87654321", "position": "user" }`    |
| **DELETE**  | `/api/users/:id`      | Elimina un usuario del sistema por su ID.                 | N/A                                                                                                                                                      |

### Resumen de los Endpoints la API de clientes

| Método HTTP | Ruta                          | Descripción                                                         | Ejemplo de Uso                                                                                                                                               |
|-------------|-------------------------------|---------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **POST**    | `/api/clients/register`       | Registra un nuevo cliente en el sistema.                            | Cuerpo: `{ "name": "Empresa XYZ", "email": "contacto@xyz.com", "phone": "123456789", "identification": "87654321", "type": "Legal" }`                        |
| **GET**     | `/api/clients`                | Lista todos los clientes registrados en el sistema.                 | N/A                                                                                                                                                          |
| **PUT**     | `/api/clients/:id`            | Actualiza la información de un cliente existente por su ID.          | Cuerpo: `{ "name": "Empresa Actualizada", "email": "nuevo_contacto@xyz.com", "phone": "987654321", "identification": "12345678", "type": "Natural" }`         |
| **DELETE**  | `/api/clients/:id`            | Elimina un cliente del sistema por su ID.                           | N/A                                                                                                                                                          |
| **GET**     | `/api/clients/:id`      | Obtiene un cliente específico por su ID.                  | N/A                                                                                                                                                      |