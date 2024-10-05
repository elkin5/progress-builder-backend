const Advance = require('../../repository/Advance');
const Task = require('../../repository/Task');

async function getAdvanceById(req, res) {
    const { advance_id } = req.params;

    try {
        // Obtener el avance por ID con la tarea asociada
        const advance = await Advance.findByPk(advance_id, {
            include: {
                model: Task,
                attributes: ['name', 'description', 'completed'],
            },
        });

        // Verificar si el avance existe
        if (!advance) {
            return res.status(404).json({ error: 'Avance no encontrado' });
        }

        return res.status(200).json(advance);
    } catch (error) {
        console.error('Error al obtener el avance:', error);
        return res.status(500).json({ error: 'Error al obtener el avance' });
    }
}

module.exports = {
    getAdvanceById,
};