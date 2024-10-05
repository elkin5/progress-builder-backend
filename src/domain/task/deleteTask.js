const Task = require('../../repository/Task');
const Advance = require('../../repository/Advance');

async function deleteTask(req, res) {
    const { task_id } = req.params;

    try {
        // Verificar si la tarea existe
        const task = await Task.findByPk(task_id);
        if (!task) {
            return res.status(404).json({ error: 'Tarea no encontrada' });
        }

        // Eliminar todos los avances asociados a la tarea
        await Advance.destroy({ where: { task_id } });

        // Eliminar la tarea
        await task.destroy();

        return res.status(200).json({ message: 'Tarea eliminada correctamente' });
    } catch (error) {
        console.error('Error al eliminar la tarea:', error);
        return res.status(500).json({ error: 'Error al eliminar la tarea' });
    }
}

module.exports = {
    deleteTask,
};