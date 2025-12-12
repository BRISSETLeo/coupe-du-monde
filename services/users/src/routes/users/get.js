const express = require('express');
const { authenticateToken, requireAdmin } = require('../../middleware/auth.middleware');
const { getAllUsers } = require('../../controllers/users/getAllUsers');

const router = express.Router();

router.get('/', authenticateToken, requireAdmin, getAllUsers);

module.exports = router;
