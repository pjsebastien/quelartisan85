# Corrections Vercel - Favicon et Blog 404

## Problèmes identifiés

1. **Favicon manquant** sur le site déployé
2. **Blog 404** - Les articles de blog retournent une erreur 404

## Causes

### 1. Favicon
- Le fichier `favicon.svg` existe dans `public/` ✅
- Mais les headers HTTP n'étaient pas configurés correctement

### 2. Blog 404
- Les articles de blog sont des fichiers HTML statiques dans `public/blog/*.html`
- Le fichier `_redirects` redirige TOUT `/blog/*` vers `/index.html`
- React Router capture aussi la route `/blog/:slug`
- Les fichiers HTML statiques ne sont donc jamais servis

## Solutions appliquées

### 1. Configuration Vercel (`vercel.json`)

Ajout de :
- `cleanUrls: true` - Permet de servir `/blog/article` pour `/blog/article.html`
- `rewrites` - Fallback vers `/index.html` pour les routes React
- `headers` - Headers corrects pour le favicon et les sitemaps

```json
{
  "cleanUrls": true,
  "trailingSlash": false,
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ],
  "headers": [...]
}
```

### 2. Correction du fichier `_redirects`

**AVANT** :
```
/blog/*.html /index.html 200
/blog/* /index.html 200
/* /index.html 200
```

**APRÈS** :
```
# Les fichiers statiques du blog sont servis directement
# Pas de redirection pour les fichiers .html existants

# Fallback pour le SPA React (toutes les autres URLs)
/* /index.html 200
```

## Comment ça fonctionne maintenant

### Ordre de priorité Vercel

1. **Fichiers statiques** - Si un fichier existe (comme `/blog/article.html`), il est servi
2. **cleanUrls** - `/blog/article` sert automatiquement `/blog/article.html` si il existe
3. **rewrites** - Si aucun fichier n'existe, redirection vers `/index.html` pour React Router

### Exemple : `/blog/signification-reve-renovation-maison`

1. Vercel cherche `/blog/signification-reve-renovation-maison.html` ✅ (trouvé)
2. Grâce à `cleanUrls`, il sert ce fichier directement
3. Le contenu HTML statique est affiché

### Exemple : `/fenetres/la-roche-sur-yon`

1. Vercel cherche `/fenetres/la-roche-sur-yon/index.html` ✅ (trouvé, pré-rendu)
2. Le contenu HTML pré-rendu est servi
3. Contenu SEO visible ✅

### Exemple : `/une-route-inexistante`

1. Vercel cherche un fichier - ❌ (non trouvé)
2. `rewrites` renvoie vers `/index.html`
3. React Router affiche la page 404

## Vérification après déploiement

### 1. Tester le favicon

```bash
curl -I https://www.quelartisan85.fr/favicon.svg
```

Devrait retourner :
```
HTTP/2 200
content-type: image/svg+xml
cache-control: public, max-age=31536000, immutable
```

### 2. Tester un article de blog

```bash
curl https://www.quelartisan85.fr/blog/signification-reve-renovation-maison
```

Devrait retourner le contenu HTML complet de l'article (pas l'app React).

### 3. Tester une page pré-rendue

```bash
curl https://www.quelartisan85.fr/fenetres/la-roche-sur-yon
```

Devrait retourner le HTML pré-rendu avec tout le contenu SEO.

## Fichiers modifiés

- ✅ [vercel.json](vercel.json) - Configuration Vercel
- ✅ [public/_redirects](public/_redirects) - Redirections corrigées

## Déploiement

```bash
git add vercel.json public/_redirects
git commit -m "Fix: Vercel favicon and blog 404 issues"
git push origin main
```

Vercel relancera automatiquement le déploiement avec les corrections.

## Résultat attendu

- ✅ Favicon visible sur toutes les pages
- ✅ Articles de blog accessibles
- ✅ Pages pré-rendues servies correctement
- ✅ React Router fonctionne pour les autres routes

---

**Date** : 2026-01-20
**Statut** : ✅ Corrections appliquées - En attente du déploiement
