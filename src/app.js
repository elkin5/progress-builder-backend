// index.js o app.js

const express = require('express');
const app = express();

// Definir el puerto en el que el servidor escuchará las peticiones
const PORT = process.env.PORT || 3000;

// Middleware para parsear JSON
app.use(express.json());

// Middleware para manejar errores
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Algo salió mal!');
});

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
