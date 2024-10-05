const Task = require('../../repository/Task');
const Project = require('../../repository/Project');
const Client = require('../../repository/Client');
const Advance = require('../../repository/Advance');

async function listTasks(req, res) {
    try {
        // Obtener todas las tareas con su proyecto asociado, cliente y los avances
        const tasks = await Task.findAll({
            include: [
                {
                    model: Project,
                    attributes: ['name', 'description', 'start_date', 'end_date'],
                    include: [
                        {
                            model: Client,  // Incluir el cliente asociado al proyecto
                            attributes: ['name', 'email', 'phone', 'identification'],
                        }
                    ],
                },
                // {
                //     model: Advance,  // Incluir avances si es necesario
                //     attributes: ['name', 'description', 'created_at'],
                // }
            ],
        });

        // Si no hay tareas registradas
        if (tasks.length === 0) {
            return res.status(404).json({ message: 'No hay tareas registradas.' });
        }

        return res.status(200).json(tasks);
    } catch (error) {
        console.error('Error al listar las tareas:', error);
        return res.status(500).json({ error: 'Error al listar las tareas' });
    }
}

module.exports = {
    listTasks,
};