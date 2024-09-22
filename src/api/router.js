const express = require('express');
const router = express.Router();
const { registerUser } = require('../domain/user/registerUser');
const { loginUser } = require('../domain/user/loginUser');
const { listUsers } = require('../domain/user/listUsers');
const { deleteUser } = require('../domain/user/deleteUser');
const { updateUser } = require('../domain/user/updateUser');
const { registerClient } = require('../domain/client/registerClient');
const { updateClient } = require('../domain/client/updateClient');
const { listClients } = require('../domain/client/listClients');
const { deleteClient } = require('../domain/client/deleteClient');
const { getUserById } = require('../domain/user/getUserById');
const { getClientById } = require('../domain/client/getClientById');

// Rutas de gestión de usuarios
router.post('/api/users/register', registerUser);
router.post('/api/users/login', loginUser);
router.get('/api/users', listUsers);
router.put('/api/users/:id', updateUser);
router.delete('/api/users/:id', deleteUser);
router.get('/api/users/:id', getUserById);

// Rutas de gestión de clientes
router.post('/api/clients/register', registerClient);
router.get('/api/clients', listClients);
router.put('/api/clients/:id', updateClient);
router.delete('/api/clients/:id', deleteClient);
router.get('/api/clients/:id', getClientById);

// Ruta de ejemplo
router.get('/', (req, res) => {
    res.send('¡Hola, mundo desde Express!');
});

// Ejemplo de ruta adicional
router.get('/api/users', (req, res) => {
    res.json([{ id: 1, name: 'Usuario 1' }, { id: 2, name: 'Usuario 2' }]);
});

module.exports = router;