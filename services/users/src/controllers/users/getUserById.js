const User = require('../../models/User');

exports.getUserById = async (req, res) => {
    try {
        const { id } = req.params;

        // Vérifier que l'utilisateur accède à ses propres données ou est admin
        if (req.user.id !== parseInt(id) && req.user.role !== 'Admin') {
            return res.status(403).json({ error: 'Accès non autorisé' });
        }

        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json({ error: 'Utilisateur non trouvé' });
        }

        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erreur lors de la récupération de l\'utilisateur' });
    }
};
