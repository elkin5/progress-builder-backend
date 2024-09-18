const User = require('../../repository/User');

async function updateUser(req, res) {
    const { id } = req.params;
    const { name, email, phone, identification, position } = req.body;

    try {
        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        // Actualizar usuario
        await user.update({ name, email, phone, identification, position });

        res.status(200).json(user);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error al actualizar el usuario' });
    }
}

module.exports = {
    updateUser
};