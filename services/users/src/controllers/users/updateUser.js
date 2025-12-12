const bcrypt = require('bcrypt');
const User = require('../../models/User');

exports.updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { email, password, role } = req.body;

        if (req.user.id !== parseInt(id) && req.user.role !== 'Admin') {
            return res.status(403).json({ error: 'Accès non autorisé' });
        }

        if (role && req.user.role !== 'Admin') {
            return res.status(403).json({ error: 'Seul un admin peut modifier le rôle' });
        }

        const existingUser = await User.findById(id);
        if (!existingUser) {
            return res.status(404).json({ error: 'Utilisateur non trouvé' });
        }

        const updates = {};
        if (email) updates.email = email;
        if (password) updates.password = await bcrypt.hash(password, 10);
        if (role && req.user.role === 'Admin') updates.role = role;

        if (Object.keys(updates).length === 0) {
            return res.status(400).json({ error: 'Aucune donnée à mettre à jour' });
        }

        const user = await User.update(id, updates);
        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erreur lors de la mise à jour de l\'utilisateur' });
    }
};
