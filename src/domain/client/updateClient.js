const Client = require('../../repository/Client');

async function updateClient(req, res) {
    const { id } = req.params;
    const { name, email, phone, identification, type } = req.body;

    try {
        const client = await Client.findByPk(id);
        if (!client) {
            return res.status(404).json({ error: 'Cliente no encontrado' });
        }

        await client.update({ name, email, phone, identification, type });

        res.status(200).json(client);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error al actualizar el cliente' });
    }
}

module.exports = {
    updateClient
};