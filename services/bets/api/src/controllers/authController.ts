import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

// Endpoint de test pour générer des tokens (À SUPPRIMER EN PRODUCTION !)
export const generateTestToken = (req: Request, res: Response) => {
    const { userId, email, role } = req.body;

    if (!userId || !email || !role) {
        return res.status(400).json({
            message: 'userId, email et role sont requis',
            example: {
                userId: 1,
                email: 'admin@example.com',
                role: 'admin'
            }
        });
    }

    const token = jwt.sign(
        { userId, email, role },
        JWT_SECRET,
        { expiresIn: '24h' }
    );

    res.json({
        token,
        user: { userId, email, role },
        expiresIn: '24h'
    });
};