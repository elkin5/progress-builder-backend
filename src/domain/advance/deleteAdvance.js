const Advance = require('../../repository/Advance');

async function deleteAdvance(req, res) {
    const { advance_id } = req.params;

    try {
        // Verificar si el avance existe
        const advance = await Advance.findByPk(advance_id);
        if (!advance) {
            return res.status(404).json({ error: 'Avance no encontrado' });
        }

        // Eliminar el avance
        await advance.destroy();

        return res.status(200).json({ message: 'Avance eliminado correctamente' });
    } catch (error) {
        console.error('Error al eliminar el avance:', error);
        return res.status(500).json({ error: 'Error al eliminar el avance' });
    }
}

module.exports = {
    deleteAdvance,
};