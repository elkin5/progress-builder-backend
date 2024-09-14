const { DataTypes } = require('sequelize');
const sequelize = require('../database/sequelize');

const Client = sequelize.define('Client', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
    },
    phone: {
        type: DataTypes.STRING,
    },
    identification: {
        type: DataTypes.STRING,
    },
    type: {
        type: DataTypes.ENUM('Natural', 'Legal'),
        allowNull: false,
    },
}, {
    timestamps: true,
    tableName: 'clients',
    // schema: 'sch_progress_builder'
});

module.exports = Client;