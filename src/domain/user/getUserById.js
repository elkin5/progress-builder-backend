const User = require('../../repository/User');

async function getUserById(req, res) {
    const { id } = req.params; // Obtiene el ID de los parámetros de la URL

    try {
        // Busca el usuario en la base de datos
        const user = await User.findByPk(id);

        // Si no existe el usuario, devuelve un error 404
        if (!user) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        // Devuelve el usuario encontrado
        res.status(200).json(user);
    } catch (error) {
        console.error('Error al obtener el usuario:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
}

module.exports = {
    getUserById,
};