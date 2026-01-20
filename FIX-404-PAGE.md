# Fix : Page 404 personnalisée n'apparaît plus

## Problème

La belle page 404 personnalisée ([NotFoundPage.tsx](src/pages/NotFoundPage.tsx)) n'apparaît plus quand on accède à une URL inexistante.

## Cause

Les routes React Router sont définies dans cet ordre :

```tsx
<Route path="/:tradeSlug/vendee" element={<TradePage />} />
<Route path="/:tradeSlug/:citySlug" element={<TradeLocationPage />} />
<Route path="*" element={<NotFoundPage />} />
```

**Problème** : Les routes avec paramètres (`/:tradeSlug/:citySlug`) matchent TOUTES les URLs avant d'arriver au wildcard `*`.

### Exemple

Quand on accède à `/une-page-qui-nexiste-pas` :
1. React Router essaie de matcher avec `/:tradeSlug/vendee` ❌
2. React Router essaie de matcher avec `/:tradeSlug/:citySlug` ✅
   - `tradeSlug` = "une-page-qui-nexiste-pas"
   - `citySlug` = undefined
3. `TradeLocationPage` s'affiche au lieu de `NotFoundPage`

## Solutions possibles

### Solution 1 : Validation dans TradeLocationPage et TradePage (Recommandé)

Valider que les slugs correspondent à de vrais métiers et villes, sinon afficher NotFoundPage.

**Avantages** :
- ✅ Meilleur pour le SEO (gère correctement les erreurs)
- ✅ Permet de logger les 404 pour analyse
- ✅ Peut afficher des suggestions basées sur l'URL

**Implémentation** :

```tsx
// Dans TradeLocationPage.tsx
const TradeLocationPage = () => {
  const { tradeSlug, citySlug } = useParams();

  // Charger les données
  const trade = metiers.find(m => m.slug === tradeSlug);
  const city = villes.find(v => v.slug === citySlug);

  // Si métier ou ville invalide, afficher 404
  if (!trade || !city) {
    return <NotFoundPage />;
  }

  // Sinon afficher la page normale
  return (
    // ... contenu normal
  );
};
```

### Solution 2 : Routes plus spécifiques

Définir explicitement toutes les routes valides (non recommandé car 7074 routes).

### Solution 3 : Middleware de validation

Créer un composant wrapper qui valide avant de rendre.

## Solution recommandée : Validation dans les composants

Ajoutons la validation des slugs dans `TradeLocationPage` et `TradePage`.

### Fichiers à modifier

1. **src/pages/TradeLocationPage.tsx**
   - Valider que `tradeSlug` existe dans `metiers.json`
   - Valider que `citySlug` existe dans `villes.json`
   - Si invalide → afficher `<NotFoundPage />`

2. **src/pages/TradePage.tsx**
   - Valider que `tradeSlug` existe dans `metiers.json`
   - Si invalide → afficher `<NotFoundPage />`

3. **src/pages/BlogPage.tsx**
   - Valider que le slug correspond à un article existant
   - Si invalide → afficher `<NotFoundPage />`

## Exemple de code

```tsx
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import NotFoundPage from './NotFoundPage';
import metiers from '../data/metiers.json';
import villes from '../data/villes.json';

const TradeLocationPage = () => {
  const { tradeSlug, citySlug } = useParams();

  // Validation
  const trade = metiers.find(m => m.slug === tradeSlug);
  const city = villes.find(v => v.slug === citySlug);

  // 404 si invalide
  if (!trade || !city) {
    return <NotFoundPage />;
  }

  // Reste du code...
  return (
    <div>
      {/* Contenu normal de la page */}
    </div>
  );
};

export default TradeLocationPage;
```

## Avantages de cette approche

### SEO
- ✅ Code HTTP 200 pour les pages valides
- ✅ NotFoundPage pour les URLs invalides (côté client)
- ✅ Contenu pertinent pour toutes les URLs

### UX
- ✅ Page 404 personnalisée avec animations
- ✅ Suggestions de navigation
- ✅ Messages humoristiques

### Analytics
- ✅ Possibilité de tracker les 404
- ✅ Identifier les URLs problématiques
- ✅ Améliorer la structure du site

## État actuel

- ✅ NotFoundPage existe et est belle
- ✅ Route wildcard `*` définie
- ❌ Validation des slugs manquante
- ❌ Routes avec paramètres matchent tout

## Prochaines étapes

1. Ajouter validation dans `TradeLocationPage`
2. Ajouter validation dans `TradePage`
3. Ajouter validation dans `BlogPage` (optionnel)
4. Tester avec URLs invalides
5. Vérifier que NotFoundPage s'affiche

## Alternative : Pour un fix rapide

Si vous voulez un fix rapide sans validation, vous pouvez réordonner les routes (mais c'est moins propre) :

```tsx
<Route path="/" element={<Homepage />} />
<Route path="/devis" element={<DevisPage />} />
{/* ... autres routes exactes ... */}
<Route path="/:tradeSlug/vendee" element={<TradePage />} />
<Route path="/:tradeSlug/:citySlug" element={<TradeLocationPage />} />
<Route path="*" element={<NotFoundPage />} />
```

Mais cela ne résout pas le problème de base : des slugs invalides afficheraient quand même une page au lieu d'une 404.

---

**Date** : 2026-01-20
**Statut** : ⚠️ Validation nécessaire dans les composants
**Priorité** : Moyenne (UX mais pas bloquant pour le SEO)
