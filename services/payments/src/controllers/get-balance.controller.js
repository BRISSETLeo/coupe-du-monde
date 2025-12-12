const { getBalance } = require('./utils/balance.utils');

function getBalanceHandler(req, res) {
    const { userId } = req.params;

    if (!userId) {
        return res.status(400).json({ error: 'userId est requis' });
    }

    return res.json({ userId, balance: getBalance(userId) });
}

module.exports = getBalanceHandler;
