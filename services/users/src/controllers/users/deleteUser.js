const User = require('../../models/User');

exports.deleteUser = async (req, res) => {
    try {
        const { id } = req.params;

        // Vérifier si l'utilisateur existe
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ error: 'Utilisateur non trouvé' });
        }

        await User.delete(id);
        res.json({ message: 'Utilisateur supprimé avec succès' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erreur lors de la suppression de l\'utilisateur' });
    }
};
