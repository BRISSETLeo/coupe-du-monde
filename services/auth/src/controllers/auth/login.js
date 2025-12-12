const axios = require('axios');
const jwt = require('jsonwebtoken');

const USERS_SERVICE_URL = process.env.USERS_SERVICE_URL || 'http://users-service:4001';

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Appeler users-service pour vérifier les credentials
        const response = await axios.post(`${USERS_SERVICE_URL}/users/login`, {
            email,
            password
        });

        const user = response.data;

        // Créer le token JWT
        const token = jwt.sign(
            { id: user.id, email: user.email, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.json({
            token,
            user: {
                id: user.id,
                email: user.email,
                role: user.role
            }
        });
    } catch (error) {
        console.error('Login error:', error.response?.data || error.message);

        if (error.response) {
            return res.status(error.response.status).json(error.response.data);
        }

        res.status(500).json({ error: 'Erreur lors de la connexion' });
    }
};
