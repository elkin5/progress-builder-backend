const { registerUser } = require('../../domain/user/registerUser');
const User = require('../../model/User');

jest.mock('../../model/User'); // Mock del modelo User para que no interactúe con la BD

describe('registerUser', () => {
    afterEach(() => {
        jest.clearAllMocks(); // Limpia todos los mocks después de cada prueba
    });

    it('debería registrar un nuevo usuario correctamente', async () => {
        const req = {
            body: { name: 'Juan', email: 'juan@example.com', password: '123456', phone: '123456789', identification: '12345678', position: 'admin' }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        // Mock de las funciones Sequelize para que no interactúen con la BD real
        User.findOne.mockResolvedValue(null); // Simula que no existe el usuario
        User.create.mockResolvedValue(req.body); // Simula la creación de un usuario

        await registerUser(req, res);

        expect(User.findOne).toHaveBeenCalledWith({ where: { email: 'juan@example.com' } });
        // expect(User.create).toHaveBeenCalledWith(expect.objectContaining(req.body));
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith(req.body);
    });

    it('debería devolver un error si el usuario ya existe', async () => {
        const req = {
            body: { name: 'Juan', email: 'juan@example.com', password: '123456' }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        User.findOne.mockResolvedValue(req.body); // Simula que el usuario ya existe

        await registerUser(req, res);

        expect(User.findOne).toHaveBeenCalledWith({ where: { email: 'juan@example.com' } });
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ error: 'El usuario ya existe' });
    });
});