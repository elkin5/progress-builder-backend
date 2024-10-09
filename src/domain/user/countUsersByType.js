const User = require('../../repository/User'); // Importar el modelo de usuario
const { Sequelize } = require('sequelize');

async function countUsersByType(req, res) {
    try {
        // Realiza la consulta para contar usuarios agrupados por el campo `userType`
        const userCount = await User.findAll({
            attributes: [
                'position',
                [Sequelize.fn('COUNT', Sequelize.col('position')), 'count']
            ],
            group: ['position']
        });

        // Mapear los resultados para que tengan la estructura solicitada
        const result = userCount.map(user => ({
            userType: user.position,
            count: parseInt(user.dataValues.count)
        }));

        return res.status(200).json(result); // Devolver el resultado como JSON
    } catch (error) {
        console.error('Error al contar usuarios por tipo:', error);
        return res.status(500).json({ error: 'Error al contar usuarios por tipo' });
    }
}

module.exports = {
    countUsersByType
};