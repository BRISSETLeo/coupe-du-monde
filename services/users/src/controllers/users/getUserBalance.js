const paymentsClient = require('../../utils/paymentsClient');

async function getUserBalance(req, res) {
    const { userId } = req.params;

    if (!userId) {
        return res.status(400).json({ error: 'userId param manquant' });
    }

    try {
        const { data } = await paymentsClient.get(`/${userId}/balance`);
        return res.json(data);
    } catch (error) {
        if (error.response) {
            return res.status(error.response.status || 502).json(error.response.data);
        }
        return res.status(502).json({ error: 'Service de paiement indisponible' });
    }
}

module.exports = getUserBalance;
