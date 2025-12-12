# Microservices Coupe du Monde

Architecture microservices avec API Gateway, services d'authentification et de paiement, et message broker RabbitMQ.

## Architecture

```
┌─────────────────┐
│   API Gateway   │ :3000 (seul port exposé publiquement)
└────────┬────────┘
         │
    ┌────┴────┬────────────┬─────────────┐
    │         │            │             │
┌───▼────┐ ┌──▼──────┐ ┌──▼──────┐ ┌────▼─────┐
│ Auth   │ │ Users   │ │ Payments│ │ RabbitMQ │
│ :4000  │ │ :4001   │ │ :4002   │ │ :5672    │
└────────┘ └───┬─────┘ └─────────┘ └──────────┘
               │
          ┌────▼──────┐
          │   MySQL   │
          │   :3306   │
          └───────────┘
```

## Services

### API Gateway (port 3000)
- Point d'entrée unique pour toutes les requêtes
- Route les requêtes vers les microservices appropriés
- Proxy pour auth, users, et payments
- Seul service exposé publiquement

### Auth Service (port 4000 - interne)
- Enregistrement et connexion des utilisateurs
- Génération et vérification de tokens JWT
- Validation de l'existence utilisateur en temps réel

### Users Service (port 4001 - interne)
- Gestion des utilisateurs (CRUD)
- Rôles : Guest (défaut) / Admin
- Routes protégées par authentification
- Communication avec Payments Service
- Base de données MySQL

### Payments Service (port 4002 - interne)
- Gestion des soldes utilisateurs
- Opérations de crédit/débit
- Stockage en mémoire des balances

### RabbitMQ (ports 5672/15672 - internes)
- Message broker pour communication inter-services
- Non exposé publiquement (sécurité)

### MySQL (port 3306 - interne)
- Base de données pour les utilisateurs
- Table users avec email, password, role
- Non exposée publiquement

## Installation et démarrage

### 1. Lancer tous les services
```bash
docker-compose up --build -d
```

### 2. Vérifier que les services sont démarrés
```bash
docker-compose ps
```

### 3. Consulter les logs
```bash
docker-compose logs -f
```

## API Endpoints (via Gateway - port 3000)

### Authentification
- `POST /api/auth/register` - Créer un compte
  ```json
  {
    "email": "user@example.com",
    "password": "motdepasse",
    "role": "Guest"  // optionnel, défaut: Guest
  }
  ```

- `POST /api/auth/login` - Se connecter
  ```json
  {
    "email": "user@example.com",
    "password": "motdepasse"
  }
  ```
  Retourne un token JWT à utiliser dans les requêtes suivantes.

- `POST /api/auth/verify` - Vérifier un token
  Header : `Authorization: Bearer <token>`

### Gestion des utilisateurs (requiert authentification)
Ajouter le header : `Authorization: Bearer <token>`

- `GET /api/users` - Liste tous les utilisateurs (Admin uniquement)
- `GET /api/users/:id` - Détails d'un utilisateur (self ou Admin)
- `PUT /api/users/:id` - Modifier un utilisateur (self ou Admin)
  ```json
  {
    "email": "newemail@example.com",
    "password": "newpassword",
    "role": "Admin"  // Admin uniquement
  }
  ```
- `DELETE /api/users/:id` - Supprimer un utilisateur (Admin uniquement)

### Gestion des paiements (requiert authentification)
Ajouter le header : `Authorization: Bearer <token>`

- `POST /api/users/:id/payments/credit` - Créditer le solde
  ```json
  {
    "amount": 100
  }
  ```

- `POST /api/users/:id/payments/debit` - Débiter le solde
  ```json
  {
    "amount": 50
  }
  ```

- `GET /api/users/:id/payments/balance` - Consulter le solde

## Sécurité

- ✅ RabbitMQ non exposé publiquement
- ✅ MySQL non exposée publiquement
- ✅ Services internes uniquement accessibles via réseau Docker
- ✅ Authentification JWT avec vérification en temps réel
- ✅ Middleware d'autorisation par rôle
- ✅ Mots de passe hashés avec bcrypt (10 rounds)
- ✅ Tokens invalidés automatiquement si utilisateur supprimé

## Variables d'environnement

Les fichiers `.env` sont créés dans chaque service. **À modifier en production** :
- JWT_SECRET (identique pour auth et users)
- Credentials MySQL
- Credentials RabbitMQ
- URLs des services internes

## Développement

Pour travailler sur un service spécifique :

```bash
# Auth service
cd services/auth
npm install
npm run dev

# Users service
cd services/users
npm install
npm run dev

# Payments service
cd services/payments
npm install
npm run dev

# API Gateway
cd services/gateway
npm install
npm run dev
```

## Tests

Utilisez les fichiers `.http` pour tester les endpoints :
- `users-auth-test.http` - Tests auth et users
- `payments-tests.http` - Tests payments
