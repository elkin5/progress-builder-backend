const cors = require('cors');

// Lee la lista de orígenes permitidos desde una variable de entorno
const allowedOrigins = process.env.ALLOWED_ORIGINS ? process.env.ALLOWED_ORIGINS.split(',') : [];

// Configuración de CORS
const corsOptions = {
    origin: function (origin, callback) {
        // Permite solicitudes sin origen (como curl o Postman)
        if (!origin) return callback(null, true);

        // Verifica si el origen de la solicitud está en la lista de orígenes permitidos
        if (allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true); // Permite el acceso
        } else {
            callback(new Error('No permitido por la política de CORS')); // Bloquea el acceso
        }
    },
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Métodos permitidos
    credentials: true, // Permite enviar cookies y headers de autenticación
};

module.exports = cors(corsOptions);