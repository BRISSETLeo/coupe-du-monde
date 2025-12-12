const paymentsClient = require('../../utils/paymentsClient');

async function creditUserBalance(req, res) {
    const { userId } = req.params;
    const { amount } = req.body || {};

    if (!userId) {
        return res.status(400).json({ error: 'userId param manquant' });
    }

    if (amount === undefined) {
        return res.status(400).json({ error: 'amount est requis' });
    }

    try {
        const { data } = await paymentsClient.post('/credit', { userId, amount });
        return res.status(201).json(data);
    } catch (error) {
        if (error.response) {
            return res.status(error.response.status || 502).json(error.response.data);
        }
        return res.status(502).json({ error: 'Service de paiement indisponible' });
    }
}

module.exports = creditUserBalance;
