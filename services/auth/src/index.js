const express = require('express');
const cors = require('cors');
require('dotenv').config();

const registerRoute = require('./routes/auth/post-register');
const loginRoute = require('./routes/auth/post-login');
const verifyRoute = require('./routes/auth/post-verify');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// Routes
app.use('/auth/register', registerRoute);
app.use('/auth/login', loginRoute);
app.use('/auth/verify', verifyRoute);

// Health check
app.get('/health', (req, res) => {
    res.json({ status: 'ok', service: 'auth-service' });
});

app.listen(PORT, () => {
    console.log(`Auth service running on port ${PORT}`);
});
