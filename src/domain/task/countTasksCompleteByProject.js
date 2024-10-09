const Task = require('../../repository/Task');

async function countTasksCompleteByProject(projectId) {
    try {
        // Contar las tareas completadas
        const completedTasks = await Task.count({
            where: {
                project_id: projectId,
                completed: true, // Suponiendo que el campo 'completed' indica si la tarea está completada
            },
        });

        // Contar las tareas pendientes
        const pendingTasks = await Task.count({
            where: {
                project_id: projectId,
                completed: false, // Las tareas que no están completadas
            },
        });

        // Retornar el resultado como un objeto
        return {
            completedTasks,
            pendingTasks,
        };
    } catch (error) {
        console.error('Error al contar las tareas:', error);
        throw error; // Lanza la excepción para que sea manejada por el código que llama esta función
    }
}

module.exports = {
    countTasksCompleteByProject,
};