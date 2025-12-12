const axios = require('axios');

const baseURL = process.env.PAYMENTS_SERVICE_URL || 'http://payments-service:4002';

const paymentsClient = axios.create({
    baseURL: `${baseURL}/payments`,
    timeout: 5000,
});

module.exports = paymentsClient;
