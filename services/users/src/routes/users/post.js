const express = require('express');
const router = express.Router();
const { createUser } = require('../../controllers/users/createUser');

// POST /users - Créer un utilisateur
router.post('/', createUser);

module.exports = router;
