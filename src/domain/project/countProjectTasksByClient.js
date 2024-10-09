const Project = require('../../repository/Project');
const {countTasksCompleteByProject} = require('../task/countTasksCompleteByProject');

async function countProjectTaskByClient(req, res) {
    const {project_id} = req.params; // Recibir el ID del cliente desde los parámetros de la URL

    try {
        // Verificar si el cliente tiene proyectos
        const project = await Project.findByPk(project_id);

        // Verificar si el proyecto existe
        if (!project) {
            return res.status(404).json({error: 'Proyecto no encontrado'});
        }

        // Obtener el conteo de tareas completadas y pendientes
        const taskCounts = await countTasksCompleteByProject(project.id);

        console.log('task:', taskCounts);

        // Retornar el resultado como un objeto
        const response = {
            projectName: project.name,
            completedTasks: taskCounts.completedTasks || 0,
            pendingTasks: taskCounts.pendingTasks || 0
        };

        res.status(200).json(response)
    } catch (error) {
        console.error('Error al obtener los proyectos y las tareas del cliente:', error);
        return res.status(500).json({error: 'Error al obtener los proyectos y las tareas del cliente'});
    }
}

module.exports = {
    countProjectTaskByClient,
};