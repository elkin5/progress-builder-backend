const Project = require('../../repository/Project');

async function deleteProject(req, res) {
    const { project_id } = req.params;

    try {
        // Verificar si el proyecto existe
        const project = await Project.findByPk(project_id);
        if (!project) {
            return res.status(404).json({ error: 'Proyecto no encontrado' });
        }

        // Eliminar el proyecto
        await project.destroy();

        return res.status(200).json({ message: 'Proyecto eliminado correctamente' });
    } catch (error) {
        console.error('Error al eliminar el proyecto:', error);
        return res.status(500).json({ error: 'Error al eliminar el proyecto' });
    }
}

module.exports = {
    deleteProject,
};