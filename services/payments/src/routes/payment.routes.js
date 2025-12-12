const express = require('express');
const creditController = require('../controllers/credit.controller');
const debitController = require('../controllers/debit.controller');
const getBalanceController = require('../controllers/get-balance.controller');

const router = express.Router();

router.post('/payments/credit', creditController);
router.post('/payments/debit', debitController);
router.get('/payments/:userId/balance', getBalanceController);

module.exports = router;
