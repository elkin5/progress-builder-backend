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
const { registerProject } = require('../domain/project/registerProject');
const { updateProject } = require('../domain/project/updateProject');
const { getProjectById } = require('../domain/project/getProjectById');
const { listProjects } = require('../domain/project/listProjects');
const { deleteProject } = require('../domain/project/deleteProject');
const { registerTask } = require('../domain/task/registerTask');
const { updateTask } = require('../domain/task/updateTask');
const { getTaskById } = require('../domain/task/getTaskById');
const { listTasks } = require('../domain/task/listTasks');
const { deleteTask } = require('../domain/task/deleteTask');
const { registerAdvance } = require('../domain/advance/registerAdvance');
const { updateAdvance } = require('../domain/advance/updateAdvance');
const { getAdvanceById } = require('../domain/advance/getAdvanceById');
const { listAdvances } = require('../domain/advance/listAdvances');
const { deleteAdvance } = require('../domain/advance/deleteAdvance');
const { uploadFile } = require('../domain/file/uploadFile');
const upload = require('../config/multerConfig');


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

// Ruta para registrar un nuevo proyecto
router.post('/api/projects/register', registerProject);
router.put('/api/projects/:project_id', updateProject);
router.get('/api/projects/:project_id', getProjectById);
router.get('/api/projects', listProjects);
router.delete('/api/projects/:project_id', deleteProject);

// Ruta para registrar una nueva tarea
router.post('/api/tasks/register', registerTask);
router.put('/api/tasks/:task_id', updateTask);
router.get('/api/tasks/:task_id', getTaskById);
router.get('/api/tasks', listTasks);
router.delete('/api/tasks/:task_id', deleteTask);

// Ruta para registrar un nuevo avance
router.post('/api/advances/register', registerAdvance);
router.put('/api/advances/:advance_id', updateAdvance);
router.get('/api/advances/:advance_id', getAdvanceById);
router.get('/api/advances', listAdvances);
router.delete('/api/advances/:advance_id', deleteAdvance);

// Ruta para subir un archivo
router.post('/api/files/upload', upload.single('file'), uploadFile);

// Ruta de ejemplo
router.get('/', (req, res) => {
    res.send('¡Hola, mundo desde Express!');
});

// Ejemplo de ruta adicional
router.get('/api/users', (req, res) => {
    res.json([{ id: 1, name: 'Usuario 1' }, { id: 2, name: 'Usuario 2' }]);
});

module.exports = router;