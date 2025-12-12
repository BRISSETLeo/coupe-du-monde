const express = require('express');
const router = express.Router();
const { getInternalUserById } = require('../../controllers/users/getInternalUserById');

// Route interne sans authentification pour auth-service
// GET /users/internal/:id
router.get('/internal/:id', getInternalUserById);

module.exports = router;
