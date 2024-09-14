const { loginUser } = require('../../domain/user/loginUser');
const User = require('../../DAO/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

jest.mock('../../DAO/User');
jest.mock('bcryptjs');
jest.mock('jsonwebtoken');

describe('loginUser', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('debería autenticar al usuario correctamente y devolver un token', async () => {
        const req = {
            body: { email: 'juan@example.com', password: '123456' }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        User.findOne.mockResolvedValue({ email: 'juan@example.com', password: 'hashed_password' });
        bcrypt.compare.mockResolvedValue(true);
        jwt.sign.mockReturnValue('token_mock');

        await loginUser(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ token: 'token_mock' });
    });

    it('debería devolver un error si el usuario no existe', async () => {
        const req = {
            body: { email: 'juan@example.com', password: '123456' }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        User.findOne.mockResolvedValue(null);

        await loginUser(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ error: 'Usuario no encontrado' });
    });
});