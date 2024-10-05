const Project = require('../../repository/Project');
const Client = require('../../repository/Client');

async function updateProject(req, res) {
    const { project_id } = req.params;
    const { name, description, start_date, end_date, client_id } = req.body;

    // Validaciones de datos
    if (!name || !start_date || !client_id) {
        return res.status(400).json({ error: 'Nombre del proyecto, fecha de inicio y cliente son obligatorios' });
    }

    try {
        // Verificar si el proyecto existe
        const project = await Project.findByPk(project_id);
        if (!project) {
            return res.status(404).json({ error: 'Proyecto no encontrado' });
        }

        // Verificar si el cliente existe
        const client = await Client.findByPk(client_id);
        if (!client) {
            return res.status(404).json({ error: 'Cliente no encontrado' });
        }

        // Actualizar el proyecto
        project.name = name;
        project.description = description;
        project.start_date = start_date;
        project.end_date = end_date;
        project.client_id = client_id;

        await project.save();

        return res.status(200).json({ message: 'Proyecto actualizado correctamente', project });
    } catch (error) {
        console.error('Error al actualizar el proyecto:', error);
        return res.status(500).json({ error: 'Error al actualizar el proyecto' });
    }
}

module.exports = {
    updateProject,
};