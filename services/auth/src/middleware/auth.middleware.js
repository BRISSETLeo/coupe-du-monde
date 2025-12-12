const jwt = require('jsonwebtoken');

// Middleware pour vérifier le token JWT
exports.authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'Token manquant' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ error: 'Token invalide ou expiré' });
        }
        req.user = user;
        next();
    });
};

// Middleware pour vérifier si l'utilisateur est admin
exports.requireAdmin = (req, res, next) => {
    if (!req.user || req.user.role !== 'Admin') {
        return res.status(403).json({ error: 'Accès réservé aux administrateurs' });
    }
    next();
};

// Middleware pour vérifier si l'utilisateur est connecté (Guest ou Admin)
exports.requireAuth = (req, res, next) => {
    if (!req.user) {
        return res.status(401).json({ error: 'Authentification requise' });
    }
    next();
};
