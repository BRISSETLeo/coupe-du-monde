const paymentsClient = require('../../utils/paymentsClient');

async function debitUserBalance(req, res) {
    const { userId } = req.params;
    const { amount } = req.body || {};

    if (!userId) {
        return res.status(400).json({ error: 'userId param manquant' });
    }

    if (amount === undefined) {
        return res.status(400).json({ error: 'amount est requis' });
    }

    try {
        const { data } = await paymentsClient.post('/debit', { userId, amount });
        return res.status(200).json(data);
    } catch (error) {
        if (error.response) {
            return res.status(error.response.status || 502).json(error.response.data);
        }
        return res.status(502).json({ error: 'Service de paiement indisponible' });
    }
}

module.exports = debitUserBalance;
