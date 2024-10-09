const Task = require('../../repository/Task');
const Project = require('../../repository/Project');

async function getTaskById(req, res) {
    const { task_id } = req.params;

    try {
        // Obtener la tarea por ID junto con el proyecto y los avances asociados
        const task = await Task.findByPk(task_id, {
            include: [
                {
                    model: Project,
                    attributes: ['name', 'description', 'start_date', 'end_date'],
                },
            ],
        });

        // Verificar si la tarea existe
        if (!task) {
            return res.status(404).json({ error: 'Tarea no encontrada' });
        }

        return res.status(200).json(task);
    } catch (error) {
        console.error('Error al obtener la tarea:', error);
        return res.status(500).json({ error: 'Error al obtener la tarea' });
    }
}

module.exports = {
    getTaskById,
};