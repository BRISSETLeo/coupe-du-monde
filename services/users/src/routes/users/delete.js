const express = require('express');
const { authenticateToken, requireAdmin } = require('../../middleware/auth.middleware');
const { deleteUser } = require('../../controllers/users/deleteUser');

const router = express.Router();

router.delete('/:id', authenticateToken, requireAdmin, deleteUser);

module.exports = router;
