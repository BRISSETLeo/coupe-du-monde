const bcrypt = require('bcrypt');
const User = require('../../models/User');

exports.createUser = async (req, res) => {
    try {
        const { email, password, role } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: 'Email et mot de passe requis' });
        }

        // Vérifier si l'utilisateur existe déjà
        const existingUser = await User.findByEmail(email);

        if (existingUser) {
            return res.status(400).json({ error: 'Cet email est déjà utilisé' });
        }

        // Hasher le mot de passe
        const hashedPassword = await bcrypt.hash(password, 10);

        // Créer l'utilisateur
        const user = await User.create(email, hashedPassword, role || 'Guest');

        res.status(201).json({
            id: user.id,
            email: user.email,
            role: user.role,
            created_at: user.created_at
        });
    } catch (error) {
        console.error('Create user error:', error);
        res.status(500).json({ error: 'Erreur lors de la création de l\'utilisateur' });
    }
};
