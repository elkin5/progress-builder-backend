const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');
const Advance = require('./Advance');

const File = sequelize.define('File', {
    file_path: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    advance_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Advance,
            key: 'id',
            onDelete: 'CASCADE',
        },
    },
}, {
    tableName: 'files',
    timestamps: true,
});

File.belongsTo(Advance, { foreignKey: 'advance_id', onDelete: 'CASCADE' });

module.exports = File;