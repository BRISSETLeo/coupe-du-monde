const { normalizeAmount, getBalance, setBalance } = require('./utils/balance.utils');

function debit(req, res) {
    const { userId, amount } = req.body || {};

    if (!userId) {
        return res.status(400).json({ error: 'userId est requis' });
    }

    const normalizedAmount = normalizeAmount(amount);
    if (normalizedAmount === null) {
        return res.status(400).json({ error: 'amount doit être un nombre positif' });
    }

    const currentBalance = getBalance(userId);
    if (currentBalance < normalizedAmount) {
        return res.status(409).json({ error: 'Solde insuffisant' });
    }

    const newBalance = setBalance(userId, currentBalance - normalizedAmount);
    return res.status(200).json({ userId, balance: newBalance });
}

module.exports = debit;
