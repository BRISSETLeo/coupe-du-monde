const axios = require('axios');

const AUTH_SERVICE_URL = process.env.AUTH_SERVICE_URL || 'http://auth-service:4000';

// Middleware pour vérifier le token JWT via auth-service
const authenticateToken = async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'Token manquant' });
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
            return res.status(403).json({ error: 'Token invalide' });
        }
    } catch (error) {
        console.error('Auth middleware error:', error.response?.data || error.message);

        // Si l'utilisateur n'existe plus
        if (error.response?.data?.logout) {
            return res.status(401).json({
                error: 'Session invalide, veuillez vous reconnecter',
                logout: true
            });
        }

        return res.status(403).json({ error: 'Token invalide ou expiré' });
    }
};

// Middleware pour vérifier si l'utilisateur est admin
const requireAdmin = (req, res, next) => {
    if (!req.user || req.user.role !== 'Admin') {
        return res.status(403).json({ error: 'Accès réservé aux administrateurs' });
    }
    next();
};

module.exports = {
    authenticateToken,
    requireAdmin
};
