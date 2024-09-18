const Client = require('../../repository/Client');

async function listClients(req, res) {
    try {
        const clients = await Client.findAll();
        res.status(200).json(clients);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error al listar los clientes' });
    }
}

module.exports = {
    listClients
};