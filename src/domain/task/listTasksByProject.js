const Task = require('../../repository/Task');
const Project = require('../../repository/Project');

async function getTasksByProject(req, res) {
    const { project_id } = req.params; // Obtener el id del proyecto desde los parámetros

    try {
        // Verificar si el proyecto existe
        const project = await Project.findByPk(project_id);
        if (!project) {
            return res.status(404).json({ message: 'Proyecto no encontrado' });
        }

        // Obtener tareas que pertenecen al proyecto
        const tasks = await Task.findAll({
            where: { project_id }, // Filtrar tareas por el project_id
            include: [{
                model: Project,
                attributes: ['name', 'description', 'start_date', 'end_date'] // Opcional, incluir detalles del proyecto si es necesario
            }]
        });

        if (tasks.length === 0) {
            return res.status(404).json({ message: 'No hay tareas para este proyecto.' });
        }

        return res.status(200).json(tasks);
    } catch (error) {
        console.error('Error al obtener las tareas por proyecto:', error);
        return res.status(500).json({ error: 'Error al obtener las tareas por proyecto' });
    }
}

module.exports = {
    getTasksByProject
};