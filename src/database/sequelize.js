// sequelize.js
const { Sequelize } = require('sequelize');

// Configuración de conexión a la base de datos PostgreSQL
const sequelize = new Sequelize('progressbuilder', 'admin', '123', {
    host: 'localhost',
    dialect: 'postgres', // Tipo de base de datos
    logging: false, // Desactiva el log de consultas SQL en la consola
});

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