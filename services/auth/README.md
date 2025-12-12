# Service Auth - Middleware d'authentification

Service centralisé pour gérer l'authentification avec JWT tokens.

## Fonctionnalités

### 1. **Enregistrement** (Register)
**Route:** `POST /auth/register`

**Body:**
```json
{
  "email": "user@example.com",
  "password": "motdepasse",
  "role": "Guest"  // optionnel, défaut: Guest
}
```

**Réponse:**
```json
{
  "id": 1,
  "email": "user@example.com",
  "role": "Guest",
  "created_at": "2025-12-12T10:00:00.000Z"
}
```

### 2. **Connexion** (Login)
**Route:** `POST /auth/login`

**Body:**
```json
{
  "email": "user@example.com",
  "password": "motdepasse"
}
```

**Réponse:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "email": "user@example.com",
    "role": "Guest"
  }
}
```

### 3. **Vérification du token** (Verify)
**Route:** `POST /auth/verify`

**Headers:**
```
Authorization: Bearer <token>
```

**Réponse:**
```json
{
  "valid": true,
  "user": {
    "id": 1,
    "email": "user@example.com",
    "role": "Guest"
  }
}
```

## Utilisation comme Middleware

### Dans l'API Gateway
Le middleware `authMiddleware` vérifie automatiquement les tokens via le service auth :

```javascript
const { authMiddleware } = require('./middleware/auth.middleware');

// Protéger une route
app.get('/api/protected', authMiddleware, (req, res) => {
  res.json({ user: req.user });
});
```

### Dans les autres services
Les services peuvent utiliser le middleware local qui vérifie directement le JWT :

```javascript
const { authenticateToken, requireAdmin } = require('./middleware/auth.middleware');

// Route nécessitant authentification
router.get('/users', authenticateToken, getUsers);

// Route nécessitant rôle Admin
router.delete('/users/:id', authenticateToken, requireAdmin, deleteUser);
```

## Variables d'environnement

```env
DB_HOST=mysql-users
DB_USER=userservice
DB_PASSWORD=userpassword
DB_NAME=users_db
JWT_SECRET=your-secret-key-change-in-production
PORT=4000
```

## Architecture

```
┌─────────────────┐
│   Client App    │
└────────┬────────┘
         │ 1. Login/Register
         │ 2. Get JWT token
         ▼
┌─────────────────┐
│  Auth Service   │ ← Vérifie credentials
│    (Port 4000)  │ → Génère JWT token
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  MySQL Users DB │
└─────────────────┘

┌─────────────────┐
│  Other Services │
│  (Users, etc.)  │
└────────┬────────┘
         │ Vérifie JWT
         │ (via middleware)
         ▼
    Accès autorisé
```

## Sécurité

- ✅ Mots de passe hashés avec bcrypt (10 rounds)
- ✅ JWT tokens avec expiration (24h)
- ✅ Validation centralisée des tokens
- ✅ Middlewares pour vérifier rôles (Guest/Admin)
- ✅ Headers Authorization avec Bearer token
