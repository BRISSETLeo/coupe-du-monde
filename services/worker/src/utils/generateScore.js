exports.generateScore = (team1, team2) => {
    try {
        return {
            team1: Math.floor(Math.random() * 10) + 1,
            team2: Math.floor(Math.random() * 10) + 1
        };
    } catch (error) {
        console.error('error generating score: ' + error);
        res.status(500).json({ error: 'error generating score' });
    }
};
