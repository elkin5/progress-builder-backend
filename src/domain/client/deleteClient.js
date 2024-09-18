const Client = require('../../repository/Client');

async function deleteClient(req, res) {
    const { id } = req.params;

    try {
        const client = await Client.findByPk(id);
        if (!client) {
            return res.status(404).json({ error: 'Cliente no encontrado' });
        }

        await client.destroy();
        res.status(200).json({ message: 'Cliente eliminado exitosamente' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error al eliminar el cliente' });
    }
}

module.exports = {
    deleteClient
};