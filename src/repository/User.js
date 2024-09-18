// models/User.js
const {DataTypes} = require('sequelize');
const sequelize = require('../config/sequelize'); // Importa la instancia de Sequelize

// Definición del modelo User
const User = sequelize.define('User', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    phone: {
        type: DataTypes.STRING,
    },
    identification: {
        type: DataTypes.STRING,
    },
    position: {
        type: DataTypes.STRING,
    }
}, {
    timestamps: true, // Incluye campos createdAt y updatedAt
    tableName: 'users', // Nombre de la tabla en la base de datos
    // schema: 'sch_progress_builder'
});

module.exports = User;