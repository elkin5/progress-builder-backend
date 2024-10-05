const Advance = require('../../repository/Advance');
const Task = require('../../repository/Task');

async function updateAdvance(req, res) {
    const { advance_id } = req.params;
    const { name, description, task_id } = req.body;

    // Validaciones
    if (!name || !task_id) {
        return res.status(400).json({ error: 'El nombre del avance y el ID de la tarea son obligatorios' });
    }

    try {
        // Verificar si el avance existe
        const advance = await Advance.findByPk(advance_id);
        if (!advance) {
            return res.status(404).json({ error: 'Avance no encontrado' });
        }

        // Verificar si la tarea asociada existe
        const task = await Task.findByPk(task_id);
        if (!task) {
            return res.status(404).json({ error: 'Tarea no encontrada' });
        }

        // Actualizar el avance
        advance.name = name;
        advance.description = description;
        advance.task_id = task_id;

        await advance.save();

        return res.status(200).json({ message: 'Avance actualizado correctamente', advance });
    } catch (error) {
        console.error('Error al actualizar el avance:', error);
        return res.status(500).json({ error: 'Error al actualizar el avance' });
    }
}

module.exports = {
    updateAdvance,
};