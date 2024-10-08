const File = require('../../repository/File');
const Advance = require('../../repository/Advance');

async function getFilesByAdvance(req, res) {
    const { advance_id } = req.params;

    try {
        // Verificar si el avance existe
        const advance = await Advance.findByPk(advance_id);
        if (!advance) {
            return res.status(404).json({ message: 'Avance no encontrado' });
        }

        // Obtener archivos asociados al avance
        const files = await File.findAll({
            where: { advance_id }, // Filtrar archivos por el advance_id
        });

        if (files.length === 0) {
            return res.status(404).json({ message: 'No hay archivos asociados a este avance.' });
        }

        return res.status(200).json(files);
    } catch (error) {
        console.error('Error al obtener archivos por avance:', error);
        return res.status(500).json({ error: 'Error al obtener archivos por avance' });
    }
}

module.exports = {
    getFilesByAdvance,
};