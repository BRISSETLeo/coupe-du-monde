const express = require('express');
const { authenticateToken } = require('../../middleware/auth.middleware');
const creditUserBalance = require('../../controllers/users/creditUserBalance');

const router = express.Router();

router.post('/:userId/payments/credit', authenticateToken, creditUserBalance);

module.exports = router;
