const Client = require('../../repository/Client'); // Importa el modelo de cliente
const { Sequelize } = require('sequelize');

async function countClientsByType(req, res) {
    try {
        // Realiza la consulta para contar clientes agrupados por el campo `clientType`
        const clientCount = await Client.findAll({
            attributes: [
                'type',
                [Sequelize.fn('COUNT', Sequelize.col('type')), 'count']
            ],
            group: ['type']
        });

        // Mapear los resultados para que tengan la estructura solicitada
        const result = clientCount.map(client => ({
            clientType: client.type,
            count: parseInt(client.dataValues.count)
        }));

        return res.status(200).json(result); // Devolver el resultado como JSON
    } catch (error) {
        console.error('Error al contar clientes por tipo:', error);
        return res.status(500).json({ error: 'Error al contar clientes por tipo' });
    }
}

module.exports = {
    countClientsByType
};