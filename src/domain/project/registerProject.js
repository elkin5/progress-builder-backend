const Project = require('../../repository/Project');
const Client = require('../../repository/Client');

async function registerProject(req, res) {
    const { name, description, start_date, end_date, client_id } = req.body;

    // Validaciones de datos
    if (!name || !start_date || !client_id) {
        return res.status(400).json({ error: 'Nombre del proyecto, fecha de inicio y cliente son obligatorios' });
    }

    try {
        // Verificar si el cliente existe
        const client = await Client.findByPk(client_id);
        if (!client) {
            return res.status(404).json({ error: 'Cliente no encontrado' });
        }

        // Crear el nuevo proyecto
        const project = await Project.create({
            name,
            description,
            start_date,
            end_date,
            client_id,
        });

        return res.status(201).json(project);
    } catch (error) {
        console.error('Error al registrar el proyecto:', error);
        return res.status(500).json({ error: 'Error al registrar el proyecto' });
    }
}

module.exports = {
    registerProject,
};