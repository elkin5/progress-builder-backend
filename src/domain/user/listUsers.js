const User = require('../../model/User');

async function listUsers(req, res) {
    try {
        const users = await User.findAll();
        res.status(200).json(users);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error al listar los usuarios' });
    }
}

module.exports = {
    listUsers
};