const Project = require('../../repository/Project');
const Client = require('../../repository/Client');

async function listProjects(req, res) {
    try {
        // Obtener todos los proyectos con la información del cliente asociado
        const projects = await Project.findAll({
            include: [
                {
                    model: Client,
                    attributes: ['name', 'email', 'phone', 'type'],
                }
            ],
        });

        // Si no hay proyectos
        if (projects.length === 0) {
            return res.status(404).json({ message: 'No hay proyectos registrados.' });
        }

        return res.status(200).json(projects);
    } catch (error) {
        console.error('Error al listar los proyectos:', error);
        return res.status(500).json({ error: 'Error al listar los proyectos' });
    }
}

module.exports = {
    listProjects,
};