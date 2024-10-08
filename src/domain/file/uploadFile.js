const File = require('../../repository/File');
const Advance = require('../../repository/Advance');
const path = require('path');

async function uploadFile(req, res) {
    const { advance_id } = req.body;

    // Validación del advance_id
    if (!advance_id) {
        return res.status(400).json({ error: 'El ID del avance es obligatorio' });
    }

    try {
        // Verificar si el avance existe
        const advance = await Advance.findByPk(advance_id);
        if (!advance) {
            return res.status(404).json({ error: 'Avance no encontrado' });
        }

        // Guardar la ruta del archivo en la base de datos
        const file = await File.create({
            file_path: req.file.path,
            advance_id: advance_id,
        });

        return res.status(201).json({ message: 'Archivo subido correctamente', file });
    } catch (error) {
        console.error('Error al subir el archivo:', error);
        return res.status(500).json({ error: 'Error al subir el archivo' });
    }
}

module.exports = {
    uploadFile,
};