const express = require('express');
const { authenticateToken } = require('../../middleware/auth.middleware');
const debitUserBalance = require('../../controllers/users/debitUserBalance');

const router = express.Router();

router.post('/:userId/payments/debit', authenticateToken, debitUserBalance);

module.exports = router;
