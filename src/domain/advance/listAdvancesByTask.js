const Advance = require('../../repository/Advance');
const Task = require('../../repository/Task');

async function getAdvancesByTask(req, res) {
    const { task_id } = req.params; // Obtener el id de la tarea desde los parámetros

    try {
        // Verificar si la tarea existe
        const task = await Task.findByPk(task_id);
        if (!task) {
            return res.status(404).json({ message: 'Tarea no encontrada' });
        }

        // Obtener avances que pertenecen a la tarea
        const advances = await Advance.findAll({
            where: { task_id }, // Filtrar avances por el task_id
            include: [{
                model: Task,
                attributes: ['name', 'description'] // Opcional, incluir detalles de la tarea si es necesario
            }]
        });

        if (advances.length === 0) {
            return res.status(404).json({ message: 'No hay avances para esta tarea.' });
        }

        return res.status(200).json(advances);
    } catch (error) {
        console.error('Error al obtener los avances por tarea:', error);
        return res.status(500).json({ error: 'Error al obtener los avances por tarea' });
    }
}

module.exports = {
    getAdvancesByTask
};