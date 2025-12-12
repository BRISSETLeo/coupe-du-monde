const axios = require('axios');
const jwt = require('jsonwebtoken');

const USERS_SERVICE_URL = process.env.USERS_SERVICE_URL || 'http://users-service:4001';

exports.verifyToken = async (req, res) => {
    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];

        if (!token) {
            return res.status(401).json({
                valid: false,
                error: 'Token manquant'
            });
        }

        // Vérifier la validité du JWT
        jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
            if (err) {
                return res.status(403).json({
                    valid: false,
                    error: 'Token invalide ou expiré'
                });
            }

            try {
                // Vérifier que l'utilisateur existe toujours dans la base de données
                // Utiliser la route interne qui ne nécessite pas d'authentification
                const userResponse = await axios.get(`${USERS_SERVICE_URL}/users/internal/${decoded.id}`);
                const user = userResponse.data;

                // Si l'utilisateur existe, vérifier si ses infos ont changé
                if (user.email !== decoded.email || user.role !== decoded.role) {
                    // Les données ont changé, générer un nouveau token avec la même expiration
                    const remainingTime = decoded.exp - Math.floor(Date.now() / 1000);

                    if (remainingTime <= 0) {
                        return res.status(403).json({
                            valid: false,
                            error: 'Token expiré'
                        });
                    }

                    const newToken = jwt.sign(
                        { id: user.id, email: user.email, role: user.role },
                        process.env.JWT_SECRET,
                        { expiresIn: remainingTime }
                    );

                    return res.json({
                        valid: true,
                        updated: true,
                        token: newToken,
                        user: {
                            id: user.id,
                            email: user.email,
                            role: user.role
                        }
                    });
                }

                // Tout est OK, token valide
                res.json({
                    valid: true,
                    user: {
                        id: user.id,
                        email: user.email,
                        role: user.role
                    }
                });
            } catch (userError) {
                // L'utilisateur n'existe plus (404) ou erreur de service
                if (userError.response && userError.response.status === 404) {
                    return res.status(401).json({
                        valid: false,
                        error: 'Utilisateur inexistant',
                        logout: true
                    });
                }

                console.error('Erreur lors de la vérification utilisateur:', userError.message);
                return res.status(500).json({
                    valid: false,
                    error: 'Erreur lors de la vérification utilisateur'
                });
            }
        });
    } catch (error) {
        console.error('Verify error:', error);
        res.status(500).json({
            valid: false,
            error: 'Erreur lors de la vérification du token'
        });
    }
};
