const Advance = require('../../repository/Advance');
const Task = require('../../repository/Task');

async function registerAdvance(req, res) {
    const { name, description, task_id } = req.body;

    // Validaciones
    if (!name || !task_id) {
        return res.status(400).json({ error: 'El nombre del avance y el ID de la tarea son obligatorios' });
    }

    try {
        // Verificar si la tarea existe
        const task = await Task.findByPk(task_id);
        if (!task) {
            return res.status(404).json({ error: 'Tarea no encontrada' });
        }

        // Crear el nuevo avance
        const advance = await Advance.create({
            name,
            description,
            task_id,
        });

        return res.status(201).json(advance);
    } catch (error) {
        console.error('Error al crear el avance:', error);
        return res.status(500).json({ error: 'Error al crear el avance' });
    }
}

module.exports = {
    registerAdvance,
};