# Microservices Coupe du Monde

Architecture microservices avec API Gateway, service d'authentification, et message broker RabbitMQ.

## Architecture

```
┌─────────────────┐
│   API Gateway   │ :3000 (seul port exposé publiquement)
└────────┬────────┘
         │
    ┌────┴────┬────────────────┐
    │         │                │
┌───▼────┐ ┌──▼───────┐  ┌────▼─────┐
│ Users  │ │ Payments │  │ RabbitMQ │
│ :4001  │ │ :4002    │  │ :5672    │
└───┬────┘ └──────────┘  └──────────┘
    │
┌───▼──────────┐
│  PostgreSQL  │
│    :5432     │
└──────────────┘
```

## Services

### API Gateway (port 3000)
- Point d'entrée unique pour toutes les requêtes
- Route les requêtes vers les microservices appropriés
- Seul service exposé publiquement

### Users Service (port 4001 - interne)
- Gestion des utilisateurs (CRUD)
- Authentification JWT
- Rôles : Guest (défaut) / Admin
- Base de données PostgreSQL

### RabbitMQ (ports 5672/15672 - internes)
- Message broker pour communication inter-services
- Non exposé publiquement (sécurité)

### PostgreSQL
- Base de données pour le service Users
- Non exposée publiquement

## Installation et démarrage

### 1. Lancer tous les services
```bash
docker-compose up --build
```

### 2. Initialiser la base de données (première fois)
```bash
cd services/users
npm install
npx prisma migrate dev --name init
```

## API Endpoints (via Gateway - port 3000)

### Authentification
- `POST /api/users/auth/register` - Créer un compte
  ```json
  {
    "email": "user@example.com",
    "password": "motdepasse",
    "role": "Guest"  // optionnel, défaut: Guest
  }
  ```

- `POST /api/users/auth/login` - Se connecter
  ```json
  {
    "email": "user@example.com",
    "password": "motdepasse"
  }
  ```
  Retourne un token JWT à utiliser dans les requêtes suivantes.

### Gestion des utilisateurs (requiert authentification)
Ajouter le header : `Authorization: Bearer <token>`

- `GET /api/users/users` - Liste tous les utilisateurs (Admin uniquement)
- `GET /api/users/users/:id` - Détails d'un utilisateur
- `PUT /api/users/users/:id` - Modifier un utilisateur
  ```json
  {
    "email": "newemail@example.com",
    "password": "newpassword",
    "role": "Admin"  // Admin uniquement
  }
  ```
- `DELETE /api/users/users/:id` - Supprimer un utilisateur (Admin uniquement)

## Sécurité

- ✅ RabbitMQ non exposé publiquement
- ✅ PostgreSQL non exposée publiquement
- ✅ Services internes uniquement accessibles via réseau Docker
- ✅ Authentification JWT
- ✅ Middleware d'autorisation par rôle
- ✅ Mots de passe hashés avec bcrypt

## Variables d'environnement

Les fichiers `.env` sont créés dans chaque service. **À modifier en production** :
- JWT_SECRET
- Credentials PostgreSQL
- Credentials RabbitMQ

## Développement

Pour travailler sur un service spécifique :

```bash
# Users service
cd services/users
npm install
npm run dev

# API Gateway
cd services/gateway
npm install
npm run dev
```
