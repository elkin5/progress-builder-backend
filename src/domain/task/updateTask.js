const Task = require('../../repository/Task');
const Project = require('../../repository/Project');

async function updateTask(req, res) {
    const { task_id } = req.params;
    const { name, description, completed, project_id } = req.body;

    // Validaciones
    if (!name || !project_id) {
        return res.status(400).json({ error: 'El nombre de la tarea y el ID del proyecto son obligatorios' });
    }

    try {
        // Verificar si la tarea existe
        const task = await Task.findByPk(task_id);
        if (!task) {
            return res.status(404).json({ error: 'Tarea no encontrada' });
        }

        // Verificar si el proyecto existe
        const project = await Project.findByPk(project_id);
        if (!project) {
            return res.status(404).json({ error: 'Proyecto no encontrado' });
        }

        // Actualizar la tarea
        task.name = name;
        task.description = description;
        task.completed = completed;
        task.project_id = project_id;

        await task.save();

        return res.status(200).json({ message: 'Tarea actualizada correctamente', task });
    } catch (error) {
        console.error('Error al actualizar la tarea:', error);
        return res.status(500).json({ error: 'Error al actualizar la tarea' });
    }
}

module.exports = {
    updateTask,
};