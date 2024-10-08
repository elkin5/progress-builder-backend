const Project = require('../../repository/Project');
const Client = require('../../repository/Client');

// Obtener proyectos por cliente
async function getProjectsByClient(req, res) {
    const { client_id } = req.params; // Obtener el id del cliente desde los parámetros

    try {
        // Verificar si el cliente existe
        const client = await Client.findByPk(client_id);
        if (!client) {
            return res.status(404).json({ message: 'Cliente no encontrado' });
        }

        // Obtener proyectos que pertenecen al cliente
        const projects = await Project.findAll({
            where: { client_id }, // Filtrar proyectos por el client_id
            include: [{
                model: Client,
                attributes: ['name', 'email', 'phone', 'type'] // Opcional, incluir detalles del cliente si es necesario
            }]
        });

        if (projects.length === 0) {
            return res.status(404).json({ message: 'No hay proyectos para este cliente.' });
        }

        return res.status(200).json(projects);
    } catch (error) {
        console.error('Error al obtener los proyectos por cliente:', error);
        return res.status(500).json({ error: 'Error al obtener los proyectos por cliente' });
    }
}

module.exports = {
    getProjectsByClient
};