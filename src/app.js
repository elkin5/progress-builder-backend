// Inicio de la aplicación
const express = require('express');
const app = express();
const sequelize = require('./database/sequelize');
const User = require('./model/User');
const bodyParser = require('body-parser');
const { registerUser } = require('./domain/user/registerUser');
const { loginUser } = require('./domain/user/loginUser');
const { listUsers } = require('./domain/user/listUsers');
const { deleteUser } = require('./domain/user/deleteUser');
const { updateUser } = require('./domain/user/updateUser');

// Definir el puerto en el que el servidor escuchará las peticiones
const PORT = process.env.PORT || 3000;

// Sincronizar modelos con la base de datos
sequelize.sync({ alter: true }) // alter: true actualizará la tabla si hay cambios
    .then(() => console.log('Modelos sincronizados con la base de datos.'))
    .catch(err => console.error('Error al sincronizar los modelos:', err));

// Middleware para parsear JSON
app.use(bodyParser.json());

app.post('/api/users/register', registerUser);
app.post('/api/users/login', loginUser);
app.get('/api/users', listUsers);
app.put('/api/users/:id', updateUser);
app.delete('/api/users/:id', deleteUser);

// Definir una ruta de ejemplo
app.get('/', (req, res) => {
    res.send('¡Hola, mundo desde Express!');
});

// Ejemplo de ruta adicional
app.get('/api/users', (req, res) => {
    res.json([{ id: 1, name: 'Usuario 1' }, { id: 2, name: 'Usuario 2' }]);
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
