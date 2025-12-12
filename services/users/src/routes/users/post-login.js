const express = require('express');
const router = express.Router();
const { loginUser } = require('../../controllers/users/loginUser');

// POST /users/login - Vérifier les credentials
router.post('/login', loginUser);

module.exports = router;
