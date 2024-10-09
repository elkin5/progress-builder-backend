const Project = require('../../repository/Project');
const {countTasksCompleteByProject} = require('../task/countTasksCompleteByProject');

async function countProjectTaskByClient(req, res) {
    const {client_id} = req.params; // Recibir el ID del cliente desde los parámetros de la URL

    console.log('client_id:', client_id);
    try {
        // Verificar si el cliente tiene proyectos
        const projects = await Project.findAll({
            where: {client_id},
        });

        let response = [];

        // Si no hay proyectos para este cliente
        if (!projects || projects.length === 0) {
            return res.status(404).json({message: 'No hay proyectos para este cliente.'});
        }

        for (const project of projects) {
            console.log('project id :', project.id);

            // Obtener el conteo de tareas completadas y pendientes
            let taskCounts = await countTasksCompleteByProject(project.id);

            console.log('task:', taskCounts);

            // Agregar al array de respuesta
            response.push({
                projectName: project.name,
                completedTasks: taskCounts.completedTasks || 0,
                pendingTasks: taskCounts.pendingTasks || 0
            });
        }

// Retornar la respuesta con los proyectos y sus tareas
        res.status(200).json(response)
    } catch (error) {
        console.error('Error al obtener los proyectos y las tareas del cliente:', error);
        return res.status(500).json({error: 'Error al obtener los proyectos y las tareas del cliente'});
    }
}

module.exports = {
    countProjectTaskByClient,
};