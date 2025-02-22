const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');
const Client = require('./Client');

const Project = sequelize.define('Project', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
    },
    start_date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    end_date: {
        type: DataTypes.DATE,
    },
    client_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Client,
            key: 'id',
        },
    }
}, {
    tableName: 'projects',
    timestamps: true,
});

Project.belongsTo(Client, { foreignKey: 'client_id' });

module.exports = Project;