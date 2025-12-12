const axios = require('axios');

const AUTH_SERVICE_URL = process.env.AUTH_SERVICE_URL || 'http://auth-service:4000';

// Middleware pour vérifier l'authentification via le service auth
exports.authMiddleware = async (req, res, next) => {
    try {
        const authHeader = req.headers['authorization'];

        if (!authHeader) {
            return res.status(401).json({ error: 'Token manquant' });
        }

        // Vérifier le token auprès du service auth
        const response = await axios.post(
            `${AUTH_SERVICE_URL}/auth/verify`,
            {},
            {
                headers: {
                    'Authorization': authHeader
                }
            }
        );

        if (response.data.valid) {
            // Ajouter les infos utilisateur à la requête
            req.user = response.data.user;
            next();
        } else {
            return res.status(403).json({ error: 'Token invalide' });
        }
    } catch (error) {
        if (error.response) {
            return res.status(error.response.status).json(error.response.data);
        }
        return res.status(500).json({ error: 'Erreur lors de la vérification du token' });
    }
};

// Middleware pour vérifier que l'utilisateur est admin
exports.requireAdmin = (req, res, next) => {
    if (!req.user || req.user.role !== 'Admin') {
        return res.status(403).json({ error: 'Accès réservé aux administrateurs' });
    }
    next();
};
