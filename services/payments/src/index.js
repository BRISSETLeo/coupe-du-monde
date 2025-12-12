const express = require('express');
const cors = require('cors');
require('dotenv').config();

const creditController = require('./controllers/credit.controller');
const debitController = require('./controllers/debit.controller');
const getBalanceController = require('./controllers/get-balance.controller');

const app = express();
const PORT = process.env.PORT || 4002;

app.use(cors());
app.use(express.json());

app.post('/payments/credit', creditController);
app.post('/payments/debit', debitController);
app.get('/payments/:userId/balance', getBalanceController);

app.get('/health', (req, res) => {
    res.json({ status: 'ok', service: 'payments-service' });
});

app.listen(PORT, () => {
    console.log(`Payments service listening on port ${PORT}`);
});
