const axios = require('axios');

const USERS_SERVICE_URL = process.env.USERS_SERVICE_URL || 'http://users-service:4001';

exports.register = async (req, res) => {
    try {
        const { email, password, role } = req.body;

        // Appeler users-service pour créer l'utilisateur
        const response = await axios.post(`${USERS_SERVICE_URL}/users`, {
            email,
            password,
            role
        });

        res.status(201).json(response.data);
    } catch (error) {
        console.error('Register error:', error.response?.data || error.message);

        if (error.response) {
            return res.status(error.response.status).json(error.response.data);
        }

        res.status(500).json({ error: 'Erreur lors de la création de l\'utilisateur' });
    }
};
