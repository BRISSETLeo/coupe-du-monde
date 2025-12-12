const express = require('express');
const { authenticateToken } = require('../../middleware/auth.middleware');
const getUserBalance = require('../../controllers/users/getUserBalance');

const router = express.Router();

router.get('/:userId/payments/balance', authenticateToken, getUserBalance);

module.exports = router;
