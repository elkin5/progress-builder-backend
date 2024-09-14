const Client = require('../../model/Client');

async function registerClient(req, res) {
    const { name, email, phone, identification, type } = req.body;

    if (!name || !email || !type) {
        return res.status(400).json({ error: 'Nombre, correo electrónico y tipo son requeridos' });
    }

    try {
        const clientExists = await Client.findOne({ where: { email } });
        if (clientExists) {
            return res.status(400).json({ error: 'El cliente ya existe' });
        }

        const client = await Client.create({
            name,
            email,
            phone,
            identification,
            type,
        });

        res.status(201).json(client);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error al registrar el cliente' });
    }
}

module.exports = {
    registerClient
};