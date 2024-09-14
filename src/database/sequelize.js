const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');

// Cargar el archivo de entorno según el valor de NODE_ENV
const envFile = process.env.NODE_ENV ? `.env.${process.env.NODE_ENV}` : '.env';
dotenv.config({ path: envFile });

// Configuración de conexión a la base de datos PostgreSQL
// const sequelize = new Sequelize('progressbuilder', 'admin', '123', {
//     host: 'localhost',
//     dialect: 'postgres', // Tipo de base de datos
//     logging: false, // Desactiva el log de consultas SQL en la consola
// });
// Configura la conexión con la base de datos usando variables de entorno
const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: process.env.DB_DIALECT,
        port: process.env.DB_PORT,
        logging: process.env.NODE_ENV === 'development',
    }
);

async function testConnection() {
    try {
        await sequelize.authenticate();
        console.log('Conexión a la base de datos exitosa.');
    } catch (error) {
        console.error('No se pudo conectar a la base de datos:', error);
    }
}

testConnection();

module.exports = sequelize;