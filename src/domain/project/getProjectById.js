const Project = require('../../repository/Project');
const Client = require('../../repository/Client');

async function getProjectById(req, res) {
    const { project_id } = req.params;

    try {
        // Obtener el proyecto por ID con las relaciones de cliente, tareas y avances
        const project = await Project.findByPk(project_id, {
            include: [
                {
                    model: Client,
                    attributes: ['name', 'email', 'phone', 'type'],
                },
            ],
        });

        // Verificar si el proyecto existe
        if (!project) {
            return res.status(404).json({ error: 'Proyecto no encontrado' });
        }

        return res.status(200).json(project);
    } catch (error) {
        console.error('Error al obtener el proyecto:', error);
        return res.status(500).json({ error: 'Error al obtener el proyecto' });
    }
}

module.exports = {
    getProjectById,
};