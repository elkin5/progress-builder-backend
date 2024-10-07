const User = require('../../repository/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const SECRET_KEY = 'clave_secreta'; // clave secreta segura

async function loginUser(req, res) {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'Correo electrónico y contraseña son requeridos' });
    }

    try {
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(400).json({ error: 'Usuario no encontrado' });
        }

        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            return res.status(400).json({ error: 'Contraseña incorrecta' });
        }

        // Crear el payload del token, incluyendo el email y el tipo de usuario
        const tokenPayload = {
            userId: user.id,
            email: user.email,
            userType: user.position,
            name: user.name
        };

        const token = jwt.sign(tokenPayload, SECRET_KEY, { expiresIn: '1h' });

        res.status(200).json({ token });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error al autenticar el usuario' });
    }
}

module.exports = {
    loginUser
};