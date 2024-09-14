const { Sequelize } = require('sequelize');
const sequelize = require('../../config/sequelize');

describe('sequelize', () => {
    it('debería conectarse exitosamente a la base de datos', async () => {
        await expect(sequelize.authenticate()).resolves.not.toThrow();
    });

    it('debería fallar la conexión a la base de datos con credenciales incorrectas', async () => {
        // Crea una nueva instancia de Sequelize con credenciales incorrectas
        const sequelizeWrong = new Sequelize(
            process.env.DB_NAME,
            process.env.DB_USER,
            process.env.DB_PASSWORD,
            {
                host: 'localhost_wrong', // Host incorrecto
                dialect: process.env.DB_DIALECT,
                port: process.env.DB_PORT,
                logging: false, // Desactiva logging para esta prueba
            }
        );

        await expect(sequelizeWrong.authenticate()).rejects.toThrow();
    });
});