const Advance = require('../../repository/Advance');
const Task = require('../../repository/Task');

async function listAdvances(req, res) {
    try {
        // Obtener todos los avances con la tarea asociada
        const advances = await Advance.findAll({
            include: {
                model: Task,
                attributes: ['name', 'description', 'completed'],
            },
        });

        // Si no hay avances registrados
        if (advances.length === 0) {
            return res.status(404).json({ message: 'No hay avances registrados.' });
        }

        return res.status(200).json(advances);
    } catch (error) {
        console.error('Error al listar los avances:', error);
        return res.status(500).json({ error: 'Error al listar los avances' });
    }
}

module.exports = {
    listAdvances,
};