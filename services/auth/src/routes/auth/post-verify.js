const express = require('express');
const { verifyToken } = require('../../controllers/auth/verify');

const router = express.Router();

router.post('/', verifyToken);

module.exports = router;
