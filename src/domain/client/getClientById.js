const Client = require('../../repository/Client');

async function getClientById(req, res) {
    const { id } = req.params; // Obtiene el ID de los parámetros de la URL

    try {
        // Busca el cliente en la base de datos
        const client = await Client.findByPk(id);

        // Si no existe el cliente, devuelve un error 404
        if (!client) {
            return res.status(404).json({ error: 'Cliente no encontrado' });
        }

        // Devuelve el cliente encontrado
        res.status(200).json(client);
    } catch (error) {
        console.error('Error al obtener el cliente:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
}

module.exports = {
    getClientById,
};