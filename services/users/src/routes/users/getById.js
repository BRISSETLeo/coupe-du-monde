const express = require('express');
const { authenticateToken } = require('../../middleware/auth.middleware');
const { getUserById } = require('../../controllers/users/getUserById');

const router = express.Router();

router.get('/:id', authenticateToken, getUserById);

module.exports = router;
