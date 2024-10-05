const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');
const Project = require('./Project');
// const Advance = require('./Advance'); // Importar el modelo Advance

const Task = sequelize.define('Task', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
    },
    completed: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    project_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Project,
            key: 'id',
        },
    },
}, {
    tableName: 'tasks',
    timestamps: true,
});

// Relación con el proyecto
Task.belongsTo(Project, { foreignKey: 'id' });

// Relación con los avances (una tarea tiene muchos avances)
// Task.hasMany(Advance, { foreignKey: 'task_id' });  // Una tarea tiene muchos avances

module.exports = Task;