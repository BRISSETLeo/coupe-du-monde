const express = require('express');
const cors = require('cors');
const { createProxyMiddleware } = require('http-proxy-middleware');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Health check
app.get('/health', (req, res) => {
    res.json({
        status: 'ok',
        service: 'api-gateway',
        timestamp: new Date().toISOString()
    });
});

// Route vers le service Auth
app.use('/api/auth', createProxyMiddleware({
    target: process.env.AUTH_SERVICE_URL,
    changeOrigin: true,
    pathRewrite: {
        '^/api/auth': '/auth'
    },
    onProxyReq: (proxyReq, req, res) => {
        console.log(`[Auth Proxy] ${req.method} ${req.url} -> ${proxyReq.path}`);
        if (req.body) {
            const bodyData = JSON.stringify(req.body);
            proxyReq.setHeader('Content-Length', Buffer.byteLength(bodyData));
            proxyReq.write(bodyData);
        }
    },
    onError: (err, req, res) => {
        console.error('Erreur proxy auth:', err.message);
        res.status(500).json({ error: 'Service auth indisponible' });
    }
}));

// Route vers le service Users
app.use('/api/users', createProxyMiddleware({
    target: process.env.USERS_SERVICE_URL,
    changeOrigin: true,
    pathRewrite: {
        '^/api/users': '/users'
    },
    onProxyReq: (proxyReq, req, res) => {
        console.log(`[Users Proxy] ${req.method} ${req.url} -> ${proxyReq.path}`);

        // Transférer l'Authorization header
        if (req.headers.authorization) {
            proxyReq.setHeader('Authorization', req.headers.authorization);
        }

        // Transférer le body pour PUT/POST/PATCH
        if (req.body && ['POST', 'PUT', 'PATCH'].includes(req.method)) {
            const bodyData = JSON.stringify(req.body);
            proxyReq.setHeader('Content-Type', 'application/json');
            proxyReq.setHeader('Content-Length', Buffer.byteLength(bodyData));
            proxyReq.write(bodyData);
        }
    },
    onError: (err, req, res) => {
        console.error('Erreur proxy users:', err.message);
        res.status(500).json({ error: 'Service users indisponible' });
    }
}));// Route vers le service Payments
app.use('/api/payments', createProxyMiddleware({
    target: process.env.PAYMENTS_SERVICE_URL,
    changeOrigin: true,
    pathRewrite: {
        '^/api/payments': '/payments'
    },
    onProxyReq: (proxyReq, req, res) => {
        console.log(`[Payments Proxy] ${req.method} ${req.url} -> ${proxyReq.path}`);

        // Transférer l'Authorization header
        if (req.headers.authorization) {
            proxyReq.setHeader('Authorization', req.headers.authorization);
        }

        // Transférer le body pour PUT/POST/PATCH
        if (req.body && ['POST', 'PUT', 'PATCH'].includes(req.method)) {
            const bodyData = JSON.stringify(req.body);
            proxyReq.setHeader('Content-Type', 'application/json');
            proxyReq.setHeader('Content-Length', Buffer.byteLength(bodyData));
            proxyReq.write(bodyData);
        }
    },
    onError: (err, req, res) => {
        console.error('Erreur proxy payments:', err.message);
        res.status(500).json({ error: 'Service payments indisponible' });
    }
}));

// Route vers le service Matchs
app.use('/api/matchs', createProxyMiddleware({
    target: process.env.MATCHS_SERVICE_URL,
    changeOrigin: true,
    pathRewrite: {
        '^/api/matchs': '/api/matchs'
    },
    onProxyReq: (proxyReq, req, res) => {
        console.log(`[Matchs Proxy] ${req.method} ${req.url} -> ${proxyReq.path}`);

        // Transférer l'Authorization header
        if (req.headers.authorization) {
            proxyReq.setHeader('Authorization', req.headers.authorization);
        }

        // Transférer le body pour PUT/POST/PATCH
        if (req.body && ['POST', 'PUT', 'PATCH'].includes(req.method)) {
            const bodyData = JSON.stringify(req.body);
            proxyReq.setHeader('Content-Type', 'application/json');
            proxyReq.setHeader('Content-Length', Buffer.byteLength(bodyData));
            proxyReq.write(bodyData);
        }
    },
    onError: (err, req, res) => {
        console.error('Erreur proxy matchs:', err.message);
        res.status(500).json({ error: 'Service matchs indisponible' });
    }
}));

// Route vers le service Teams (partie de matchs)
app.use('/api/teams', createProxyMiddleware({
    target: process.env.MATCHS_SERVICE_URL,
    changeOrigin: true,
    pathRewrite: {
        '^/api/teams': '/api/teams'
    },
    onProxyReq: (proxyReq, req, res) => {
        console.log(`[Teams Proxy] ${req.method} ${req.url} -> ${proxyReq.path}`);

        // Transférer l'Authorization header
        if (req.headers.authorization) {
            proxyReq.setHeader('Authorization', req.headers.authorization);
        }

        // Transférer le body pour PUT/POST/PATCH
        if (req.body && ['POST', 'PUT', 'PATCH'].includes(req.method)) {
            const bodyData = JSON.stringify(req.body);
            proxyReq.setHeader('Content-Type', 'application/json');
            proxyReq.setHeader('Content-Length', Buffer.byteLength(bodyData));
            proxyReq.write(bodyData);
        }
    },
    onError: (err, req, res) => {
        console.error('Erreur proxy teams:', err.message);
        res.status(500).json({ error: 'Service teams indisponible' });
    }
}));

// Route par défaut
app.use('*', (req, res) => {
    res.status(404).json({
        error: 'Route non trouvée',
        availableRoutes: [
            'GET /health',
            'POST /api/auth/register',
            'POST /api/auth/login',
            'GET /api/users',
            'GET /api/users/:id',
            'PUT /api/users/:id',
            'DELETE /api/users/:id',
            'ANY /api/payments/*',
            'GET /api/teams',
            'GET /api/teams/:id',
            'POST /api/teams (Admin)',
            'PUT /api/teams/:id (Admin)',
            'DELETE /api/teams/:id (Admin)',
            'GET /api/matchs',
            'GET /api/matchs/:id',
            'POST /api/matchs (Admin)',
            'PUT /api/matchs/:id (Admin)',
            'DELETE /api/matchs/:id (Admin)'
        ]
    });
});

app.listen(PORT, () => {
    console.log(`API Gateway running on port ${PORT}`);
    console.log(`Proxying auth to: ${process.env.AUTH_SERVICE_URL}`);
    console.log(`Proxying users to: ${process.env.USERS_SERVICE_URL}`);
    console.log(`Proxying payments to: ${process.env.PAYMENTS_SERVICE_URL}`);
    console.log(`Proxying matchs/teams to: ${process.env.MATCHS_SERVICE_URL}`);
});