const User = require('../../model/User');
const bcrypt = require('bcryptjs');

async function registerUser(req, res) {
    const {name, email, password, phone, identification, position} = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({error: 'Nombre, correo electrónico y contraseña son requeridos'});
    }

    try {
        // Verificar si el usuario ya existe
        const userExists = await User.findOne({where: {email}});
        if (userExists) {
            return res.status(400).json({error: 'El usuario ya existe'});
        }

        // Encriptar la contraseña
        const hashedPassword = await bcrypt.hash(password, 10);

        // Crear un nuevo usuario
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            phone,
            identification,
            position
        });

        res.status(201).json(user);
    } catch (err) {
        console.error(err);
        res.status(500).json({error: 'Error al registrar el usuario'});
    }
}

module.exports = {
    registerUser
};