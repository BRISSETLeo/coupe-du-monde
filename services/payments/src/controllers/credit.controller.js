const { normalizeAmount, getBalance, setBalance } = require('./utils/balance.utils');

function credit(req, res) {
    const { userId, amount } = req.body || {};

    if (!userId) {
        return res.status(400).json({ error: 'userId est requis' });
    }

    const normalizedAmount = normalizeAmount(amount);
    if (normalizedAmount === null) {
        return res.status(400).json({ error: 'amount doit être un nombre positif' });
    }

    const newBalance = setBalance(userId, getBalance(userId) + normalizedAmount);
    return res.status(201).json({ userId, balance: newBalance });
}

module.exports = credit;
