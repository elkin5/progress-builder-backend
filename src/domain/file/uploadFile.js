const File = require('../../repository/File');
const Task = require('../../repository/Task');
const path = require('path');

async function uploadFile(req, res) {
    const { task_id } = req.body;

    // Validación del task_id
    if (!task_id) {
        return res.status(400).json({ error: 'El ID de la tarea es obligatorio' });
    }

    try {
        // Verificar si la tarea existe
        const task = await Task.findByPk(task_id);
        if (!task) {
            return res.status(404).json({ error: 'Tarea no encontrada' });
        }

        // Guardar la ruta del archivo en la base de datos
        const file = await File.create({
            file_path: req.file.path,
            task_id: task_id,
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