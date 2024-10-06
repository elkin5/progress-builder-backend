const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');
const Task = require('./Task');

const File = sequelize.define('File', {
    file_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    file_path: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    task_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Task,
            key: 'id',
        },
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
}, {
    tableName: 'files',
    timestamps: false,
});

File.belongsTo(Task, { foreignKey: 'id' });

module.exports = File;