const express = require('express');
const cors = require('cors');
require('dotenv').config();

const getUsersRoute = require('./routes/users/get');
const getUserByIdRoute = require('./routes/users/getById');
const internalGetUserRoute = require('./routes/users/internal-get');
const updateUserRoute = require('./routes/users/put');
const deleteUserRoute = require('./routes/users/delete');
const createUserRoute = require('./routes/users/post');
const loginUserRoute = require('./routes/users/post-login');
const paymentsCreditRoute = require('./routes/users/paymentsCredit');
const paymentsDebitRoute = require('./routes/users/paymentsDebit');
const paymentsBalanceRoute = require('./routes/users/paymentsBalance');

const app = express();
const PORT = process.env.PORT || 4001;

app.use(cors());
app.use(express.json());

// Routes
app.use('/users', createUserRoute);
app.use('/users', loginUserRoute);
app.use('/users', internalGetUserRoute); // Route interne sans auth
app.use('/users', getUsersRoute);
app.use('/users', getUserByIdRoute);
app.use('/users', updateUserRoute);
app.use('/users', deleteUserRoute);
app.use('/users', paymentsCreditRoute);
app.use('/users', paymentsDebitRoute);
app.use('/users', paymentsBalanceRoute);

// Health check
app.get('/health', (req, res) => {
    res.json({ status: 'ok', service: 'users-service' });
});

app.listen(PORT, () => {
    console.log(`Users service running on port ${PORT}`);
});