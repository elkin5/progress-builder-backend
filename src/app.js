const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./config/sequelize');
const corsConfig = require('./config/corsConfig');
const userRouter = require('./api/router');
const {join} = require("node:path"); // Importa el enrutador de rutas
const app = express();

// Configuración personalizada de CORS
app.use(corsConfig);

// Definir el puerto en el que el servidor escuchará las peticiones
const PORT = process.env.PORT || 3000;

// Middleware para parsear JSON
app.use(bodyParser.json());

// Definir la ruta estática para los archivos públicos
app.use('/api/files/public', express.static(join('../public/uploads')));

// Sincronizar modelos con la base de datos
sequelize.sync({ alter: true }) // alter: true actualizará la tabla si hay cambios
    .then(() => console.log('Modelos sincronizados con la base de datos.'))
    .catch(err => console.error('Error al sincronizar los modelos:', err));

// Usa el enrutador de rutas
app.use('/', userRouter);

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});