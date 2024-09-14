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

### Estructura del proyecto
```
progress-builder-backend/
│
├── src/
│   ├── app.js
│   ├── domain/
│   │   ├── user/
│   │   │   ├── deleteUser.js
│   │   │   ├── listUsers.js
│   │   │   ├── loginUser.js
│   │   │   ├── registerUser.js
│   │   │   └── updateUser.js
│   ├── models/
│   │   └── User.js
│   └── database/
│       └── sequelize.js
├── package.json
└── package-lock.json
```

### Api Rest
#### Documentación con postman
https://documenter.getpostman.com/view/7107972/2sAXjRW9ph

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