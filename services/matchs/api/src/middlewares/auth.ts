import { Request, Response, NextFunction } from 'express';
import axios from 'axios';

interface UserPayload {
    userId: number;
    email: string;
    role: string;
}

declare global {
    namespace Express {
        interface Request {
            user?: UserPayload;
        }
    }
}

const AUTH_SERVICE_URL = process.env.AUTH_SERVICE_URL || 'http://auth-service:4000';

// Middleware pour vérifier le token JWT via auth-service
export const authenticateToken = async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Accès refusé. Token manquant.' });
    }

    try {
        // Appeler auth-service pour vérifier le token
        const response = await axios.post(`${AUTH_SERVICE_URL}/auth/verify`, {}, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (response.data.valid) {
            req.user = response.data.user;

            // Si le token a été mis à jour, l'informer dans la réponse
            if (response.data.updated && response.data.token) {
                res.setHeader('X-New-Token', response.data.token);
            }

            next();
        } else {
            return res.status(403).json({ message: 'Token invalide.' });
        }
    } catch (error: any) {
        console.error('Auth middleware error:', error.response?.data || error.message);

        // Si l'utilisateur n'existe plus
        if (error.response?.data?.logout) {
            return res.status(401).json({
                message: 'Session invalide, veuillez vous reconnecter',
                logout: true
            });
        }

        return res.status(403).json({ message: 'Token invalide ou expiré.' });
    }
};

// Middleware pour vérifier si l'utilisateur est admin
export const requireAdmin = (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
        return res.status(401).json({ message: 'Authentification requise.' });
    }

    if (req.user.role !== 'Admin') {
        return res.status(403).json({ message: 'Accès refusé. Droits administrateur requis.' });
    }

    next();
};

// Middleware combiné pour simplifier l'utilisation
export const requireAdminAuth = [authenticateToken, requireAdmin];
