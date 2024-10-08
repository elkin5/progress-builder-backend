const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');
const Task = require('./Task');

const Advance = sequelize.define('Advance', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
    },
    task_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Task,
            key: 'id',
            onDelete: 'CASCADE',
        },
    },
}, {
    tableName: 'advances',
    timestamps: true,
});

// Relación con la tarea (un avance pertenece a una tarea)
Advance.belongsTo(Task, { foreignKey: 'task_id', onDelete: 'CASCADE' });

module.exports = Advance;