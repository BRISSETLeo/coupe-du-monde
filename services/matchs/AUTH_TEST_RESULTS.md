# 🔐 Tests d'Authentification et Autorisation - Service Matchs

## ✅ Résumé

Le système d'authentification JWT et d'autorisation basée sur les rôles fonctionne parfaitement !

### 🔑 Middleware d'Authentification

Le middleware `auth.ts` implémente :
- **Authentification JWT** : Vérification des tokens Bearer
- **Autorisation par rôle** : Restriction des actions aux administrateurs
- **Gestion d'erreurs** : Messages clairs pour les échecs d'authentification

### 🛡️ Routes Protégées

#### Routes **PUBLIQUES** (Accessibles sans authentification)
- ✅ `GET /api/teams` - Liste des équipes
- ✅ `GET /api/teams/:id` - Détails d'une équipe
- ✅ `GET /api/matchs` - Liste des matchs
- ✅ `GET /api/matchs/:id` - Détails d'un match

#### Routes **PROTÉGÉES** (Nécessitent rôle Admin)
- 🔒 `POST /api/teams` - Créer une équipe
- 🔒 `PUT /api/teams/:id` - Modifier une équipe
- 🔒 `DELETE /api/teams/:id` - Supprimer une équipe
- 🔒 `POST /api/matchs` - Créer un match
- 🔒 `PUT /api/matchs/:id` - Modifier un match
- 🔒 `DELETE /api/matchs/:id` - Supprimer un match

---

## 📊 Résultats des Tests

### ✅ Test 1 : Routes Publiques
**GET /api/teams** (sans token)
```
HTTP 200 - Succès ✓
```
Les routes GET sont accessibles sans authentification.

### ✅ Test 2 : POST sans Token
**POST /api/teams** (sans token)
```json
{
  "message": "Accès refusé. Token manquant."
}
HTTP 401 - Unauthorized ✓
```

### ✅ Test 3 : POST avec Token Admin
**POST /api/teams** (avec token admin)
```json
{
  "name": "Portugal",
  "country": "Portugal",
  "logo": "https://example.com/portugal.png",
  "id": 6
}
HTTP 201 - Created ✓
```

### ✅ Test 4 : POST avec Token User (Non-Admin)
**POST /api/teams** (avec token user)
```json
{
  "message": "Accès refusé. Droits administrateur requis."
}
HTTP 403 - Forbidden ✓
```

### ✅ Test 5 : PUT sans Token
**PUT /api/teams/1** (sans token)
```json
{
  "message": "Accès refusé. Token manquant."
}
HTTP 401 - Unauthorized ✓
```

### ✅ Test 6 : PUT avec Token Admin
**PUT /api/teams/1** (avec token admin)
```json
{
  "id": 1,
  "name": "France Équipe Nationale",
  "country": "France",
  ...
}
HTTP 200 - OK ✓
```

### ✅ Test 7 : DELETE sans Token
**DELETE /api/teams/6** (sans token)
```json
{
  "message": "Accès refusé. Token manquant."
}
HTTP 401 - Unauthorized ✓
```

### ✅ Test 8 : DELETE avec Token Admin
**DELETE /api/teams/6** (avec token admin)
```
HTTP 204 - No Content ✓
```

### ✅ Test 9 : Token Invalide
**POST /api/teams** (avec token invalide)
```json
{
  "message": "Token invalide ou expiré."
}
HTTP 403 - Forbidden ✓
```

---

## 🎯 Comment Utiliser

### 1. Générer un Token Admin

```bash
POST http://localhost:3000/api/auth/generate-token
Content-Type: application/json

{
  "userId": 1,
  "email": "admin@example.com",
  "role": "admin"
}
```

**Réponse :**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "userId": 1,
    "email": "admin@example.com",
    "role": "admin"
  },
  "expiresIn": "24h"
}
```

### 2. Utiliser le Token dans les Requêtes

```bash
POST http://localhost:3000/api/teams
Content-Type: application/json
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

{
  "name": "Nouvelle Équipe",
  "country": "Pays"
}
```

---

## 📝 Structure du Token JWT

Le token contient les informations suivantes :
```json
{
  "userId": 1,
  "email": "admin@example.com",
  "role": "admin",
  "iat": 1765549166,
  "exp": 1765635566
}
```

- **userId** : Identifiant de l'utilisateur
- **email** : Email de l'utilisateur
- **role** : Rôle (`admin` ou `user`)
- **iat** : Date de création (timestamp)
- **exp** : Date d'expiration (24h après création)

---

## 🔒 Codes d'État HTTP

| Code | Signification | Quand ? |
|------|---------------|---------|
| 200 | OK | Opération réussie (GET, PUT) |
| 201 | Created | Ressource créée (POST) |
| 204 | No Content | Suppression réussie (DELETE) |
| 401 | Unauthorized | Token manquant |
| 403 | Forbidden | Token invalide ou rôle insuffisant |
| 404 | Not Found | Ressource inexistante |

---

## ⚠️ Notes Importantes

### Route de Test - À SUPPRIMER EN PRODUCTION
La route `/api/auth/generate-token` est **uniquement pour le développement**. 
En production :
- ❌ Supprimer cette route
- ✅ Implémenter un vrai système d'authentification (login/register)
- ✅ Connecter au service `auth` si disponible

### Variables d'Environnement
Fichier `.env` :
```env
JWT_SECRET=my-super-secret-jwt-key-change-in-production
```
⚠️ **Changer cette clé en production !**

---

## 📄 Fichier api.http

Le fichier `api.http` contient tous les tests prêts à l'emploi :
1. Générer des tokens (admin et user)
2. Tester les routes publiques
3. Tester les routes protégées sans token
4. Tester les routes protégées avec token admin
5. Tester les routes protégées avec token user
6. Tester les cas d'erreur

**Utilisation :**
1. Ouvrir `api.http` dans VS Code
2. Installer l'extension "REST Client"
3. Générer un token admin (cliquer sur "Send Request")
4. Copier le token dans la variable `@adminToken`
5. Tester les différentes routes

---

## 🎉 Conclusion

✅ **Tous les tests passent avec succès !**

Le système d'authentification et d'autorisation est **opérationnel** :
- ✅ Routes publiques accessibles sans restriction
- ✅ Routes protégées nécessitent un token valide
- ✅ Actions sensibles réservées aux administrateurs
- ✅ Gestion appropriée des erreurs (401, 403)
- ✅ Tokens JWT avec expiration (24h)
- ✅ Validation du rôle utilisateur

**Prochaines étapes recommandées :**
- Implémenter un vrai service d'authentification
- Ajouter un système de refresh tokens
- Implémenter la limitation de débit (rate limiting)
- Ajouter des logs d'audit pour les actions admin
- Connecter au service `auth` existant si disponible
