const Task = require('../../repository/Task');
const Project = require('../../repository/Project');

async function registerTask(req, res) {
    const { name, description, project_id } = req.body;

    // Validaciones
    if (!name || !project_id) {
        return res.status(400).json({ error: 'El nombre de la tarea y el ID del proyecto son obligatorios' });
    }

    try {
        // Verificar si el proyecto existe
        const project = await Project.findByPk(project_id);
        if (!project) {
            return res.status(404).json({ error: 'Proyecto no encontrado' });
        }

        // Crear la nueva tarea
        const task = await Task.create({
            name,
            description,
            project_id,
        });

        return res.status(201).json(task);
    } catch (error) {
        console.error('Error al crear la tarea:', error);
        return res.status(500).json({ error: 'Error al crear la tarea' });
    }
}

module.exports = {
    registerTask,
};