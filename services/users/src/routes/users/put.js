const express = require('express');
const { authenticateToken } = require('../../middleware/auth.middleware');
const { updateUser } = require('../../controllers/users/updateUser');

const router = express.Router();

router.put('/:id', authenticateToken, updateUser);

module.exports = router;
