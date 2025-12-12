# Tests du Service Matchs

## ✅ Résumé des Tests

Tous les endpoints du service matchs ont été testés avec succès !

### Service Info
- **URL**: http://localhost:3000
- **Base Path**: /api
- **Database**: MySQL 8.0
- **Port**: 3000

---

## 📋 Endpoints Teams

### ✅ GET /api/teams
Récupère toutes les équipes
```bash
curl -X GET http://localhost:3000/api/teams
```
**Résultat**: 4 équipes retournées (France, Brésil, Allemagne, Argentine)

### ✅ GET /api/teams/:id
Récupère une équipe par son ID
```bash
curl -X GET http://localhost:3000/api/teams/1
```
**Résultat**: Équipe France retournée avec tous ses détails

### ✅ POST /api/teams
Crée une nouvelle équipe
```bash
curl -X POST http://localhost:3000/api/teams \
  -H "Content-Type: application/json" \
  -d '{"name":"Espagne","country":"Espagne","logo":"https://example.com/spain.png"}'
```
**Résultat**: Équipe créée avec ID 5

### ✅ PUT /api/teams/:id
Met à jour une équipe existante
```bash
curl -X PUT http://localhost:3000/api/teams/5 \
  -H "Content-Type: application/json" \
  -d '{"name":"Espagne Mise à jour"}'
```
**Résultat**: Équipe mise à jour avec succès

### ✅ DELETE /api/teams/:id
Supprime une équipe
```bash
curl -X DELETE http://localhost:3000/api/teams/5
```
**Résultat**: HTTP 204 (No Content) - Suppression réussie

---

## 🏆 Endpoints Matchs

### ✅ GET /api/matchs
Récupère tous les matchs
```bash
curl -X GET http://localhost:3000/api/matchs
```
**Résultat**: 2 matchs retournés

### ✅ GET /api/matchs/:id
Récupère un match par son ID
```bash
curl -X GET http://localhost:3000/api/matchs/1
```
**Résultat**: Match France vs Brésil retourné avec tous ses détails

### ✅ POST /api/matchs
Crée un nouveau match
```bash
curl -X POST http://localhost:3000/api/matchs \
  -H "Content-Type: application/json" \
  -d '{
    "team1_id":1,
    "team2_id":5,
    "match_date":"2025-12-25 15:00:00",
    "status":"scheduled",
    "stadium":"Camp Nou"
  }'
```
**Résultat**: Match créé avec ID 3

### ✅ PUT /api/matchs/:id
Met à jour un match existant (ex: mise à jour du score)
```bash
curl -X PUT http://localhost:3000/api/matchs/3 \
  -H "Content-Type: application/json" \
  -d '{"score1":2,"score2":1,"status":"finished"}'
```
**Résultat**: Match mis à jour avec le nouveau score

### ✅ DELETE /api/matchs/:id
Supprime un match
```bash
curl -X DELETE http://localhost:3000/api/matchs/3
```
**Résultat**: HTTP 204 (No Content) - Suppression réussie

---

## 🔍 Tests d'Erreur

### ✅ GET /api/matchs/999 (ID inexistant)
```bash
curl -X GET http://localhost:3000/api/matchs/999
```
**Résultat**: HTTP 404 avec message `{"message":"Match non trouvé"}`

### ✅ GET /api/teams/999 (ID inexistant)
```bash
curl -X GET http://localhost:3000/api/teams/999
```
**Résultat**: HTTP 404 avec message `{"message":"Équipe non trouvée"}`

---

## 📊 Structure de Données

### Team
```json
{
  "id": 1,
  "name": "France",
  "country": "France",
  "logo": "https://example.com/france.png",
  "created_at": "2025-12-12T14:06:34.000Z",
  "updated_at": "2025-12-12T14:06:34.000Z"
}
```

### Match
```json
{
  "id": 1,
  "team1_id": 1,
  "team2_id": 2,
  "score1": 0,
  "score2": 0,
  "match_date": "2025-12-20T20:00:00.000Z",
  "status": "scheduled",
  "stadium": "Stade de France",
  "created_at": "2025-12-12T14:06:34.000Z",
  "updated_at": "2025-12-12T14:06:34.000Z"
}
```

### Statuts de Match Possibles
- `scheduled` - Match planifié
- `in_progress` - Match en cours
- `finished` - Match terminé
- `cancelled` - Match annulé

---

## 🎯 Conclusion

✅ **Tous les tests sont passés avec succès !**

Le service matchs fonctionne parfaitement avec :
- CRUD complet pour les équipes
- CRUD complet pour les matchs
- Gestion des erreurs appropriée (404 pour ressources inexistantes)
- Relations entre matchs et équipes via foreign keys
- Timestamps automatiques (created_at, updated_at)
- Validation des statuts de match

**Prochaines étapes recommandées** :
- Ajouter la validation des données d'entrée
- Implémenter l'authentification/autorisation
- Ajouter des endpoints de recherche/filtrage
- Mettre en place des tests unitaires et d'intégration
