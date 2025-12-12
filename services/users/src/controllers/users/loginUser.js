const bcrypt = require('bcrypt');
const User = require('../../models/User');

exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: 'Email et mot de passe requis' });
        }

        const user = await User.findByEmail(email);

        if (!user) {
            return res.status(401).json({ error: 'Email ou mot de passe incorrect' });
        }

        const validPassword = await bcrypt.compare(password, user.password);

        if (!validPassword) {
            return res.status(401).json({ error: 'Email ou mot de passe incorrect' });
        }

        res.json({
            id: user.id,
            email: user.email,
            role: user.role,
            created_at: user.created_at
        });
    } catch (error) {
        console.error('Login user error:', error);
        res.status(500).json({ error: 'Erreur lors de la vérification des credentials' });
    }
};
