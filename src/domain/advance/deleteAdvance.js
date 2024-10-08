const fs = require('fs');
const path = require('path');
const Advance = require('../../repository/Advance');
const File = require('../../repository/File'); // Asumiendo que tienes un modelo File

async function deleteAdvance(req, res) {
    const { advance_id } = req.params;

    try {
        // Verificar si el avance existe
        const advance = await Advance.findByPk(advance_id);
        if (!advance) {
            return res.status(404).json({ error: 'Avance no encontrado' });
        }

        // Obtener todos los archivos asociados al avance
        const files = await File.findAll({ where: { advance_id } });

        // Eliminar los archivos del sistema de archivos
        for (const file of files) {
            const filePath = path.join(__dirname, '../../uploads/', file.file_path); // Ajustar la ruta de acuerdo a tu sistema
            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath); // Eliminar el archivo físico
            }
        }

        // Eliminar los archivos de la base de datos
        await File.destroy({ where: { advance_id } });

        // Eliminar el avance
        await advance.destroy();

        return res.status(200).json({ message: 'Avance y archivos eliminados correctamente' });
    } catch (error) {
        console.error('Error al eliminar el avance:', error);
        return res.status(500).json({ error: 'Error al eliminar el avance' });
    }
}

module.exports = {
    deleteAdvance,
};