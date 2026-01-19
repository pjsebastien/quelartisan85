# Guide de déploiement Vercel - Quel Artisan 85

## ✅ Configuration actuelle

Votre projet est maintenant **prêt pour Vercel** avec :

- ✅ `cross-env` ajouté aux devDependencies
- ✅ Script `build` compatible Vercel
- ✅ 7 074 pages HTML pré-rendues
- ✅ Sitemap complet

## 🚀 Processus de déploiement

### Ce qui se passe sur Vercel

1. **Installation des dépendances**
   ```bash
   npm install
   ```

2. **Build du projet**
   ```bash
   npm run build
   ```

   Cette commande fait :
   - `vite build` - Build client
   - `cross-env SSR=true vite build` - Build SSR
   - `node generate-sitemap.js` - Génération de 7 074 pages HTML

3. **Déploiement**
   - Les fichiers du dossier `dist/` sont déployés
   - Toutes les 7 074 pages sont accessibles

## 📋 Checklist avant déploiement

### 1. Vérifier les dépendances

```json
{
  "devDependencies": {
    "cross-env": "^7.0.3"  // ✅ Ajouté
  }
}
```

### 2. Vérifier le script build

```json
{
  "scripts": {
    "build": "vite build && cross-env SSR=true vite build && node generate-sitemap.js"
  }
}
```

### 3. Commit et push

```bash
git add package.json
git commit -m "Add cross-env for Vercel deployment"
git push origin main
```

## 🔧 Configuration Vercel

### Paramètres recommandés

Dans le dashboard Vercel :

**Build & Development Settings**
- **Framework Preset** : Vite
- **Build Command** : `npm run build` (par défaut)
- **Output Directory** : `dist` (par défaut)
- **Install Command** : `npm install` (par défaut)

**Environment Variables**
Aucune variable n'est nécessaire pour le moment.

## 📊 Build attendu

### Logs de build

Vous devriez voir :

```
Installing dependencies...
added 368 packages

Running "npm run build"

✓ 1502 modules transformed.
dist/index.html                  0.59 kB
dist/assets/index-DLF-Zg_w.css  45.90 kB
dist/assets/index-BcA5shRn.js   556.41 kB
✓ built in 6.12s

Building for SSR...
✓ 1 modules transformed.
dist-ssr/entry-server.js        XXX kB
✓ SSR built in X.XXs

Generating sitemap and prerendering pages...
✅ SSR render function loaded successfully
✅ Base HTML template loaded
🔄 Prerendering: / -> dist/index.html
✅ Generated: dist/index.html
🔄 Prerendering: /devis -> dist/devis/index.html
✅ Generated: dist/devis/index.html
...
[7074 pages générées]
...

🎉 Build completed successfully!
📍 Sitemap location: dist/sitemap.xml
📊 Total URLs: 7074
✅ All pages have been prerendered with full HTML content!
```

### Durée estimée du build

- **Installation** : ~10-20 secondes
- **Build client** : ~5-10 secondes
- **Build SSR** : ~5-10 secondes
- **Pré-rendu (7074 pages)** : ~5-10 minutes
- **Total** : ~6-12 minutes

⚠️ Le build peut sembler long car il génère 7 074 pages HTML.

## 🔍 Vérification après déploiement

### 1. Vérifier une page au hasard

```bash
curl https://votre-site.vercel.app/fenetres/la-roche-sur-yon
```

Devrait retourner du HTML complet, pas juste `<!--app-html-->`.

### 2. Vérifier le sitemap

```bash
curl https://votre-site.vercel.app/sitemap.xml | grep -c "<loc>"
```

Devrait retourner : **7074**

### 3. Test dans le navigateur

1. Ouvrez https://votre-site.vercel.app
2. Clic droit > "Afficher le code source"
3. Cherchez `<div id="root">`
4. ✅ Vous devez voir tout le HTML

### 4. Google Rich Results Test

https://search.google.com/test/rich-results

Entrez une URL de votre site et vérifiez que le contenu est bien visible.

## 🚨 Problèmes possibles

### Build timeout (si > 10 min)

**Solution** : Passer à un plan Vercel supérieur avec timeout plus long.

Alternative : Utiliser un hébergement statique comme Netlify qui a des timeouts plus généreux.

### Erreur "cross-env not found"

**Solution** :
```bash
npm install cross-env --save-dev
git add package.json package-lock.json
git commit -m "Fix cross-env dependency"
git push
```

### Pages ne s'affichent pas (404)

**Solution** : Créer un fichier `vercel.json` :

```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

### Sitemap vide

**Solution** : Vérifier les logs du build sur Vercel. Le script `generate-sitemap.js` doit s'exécuter.

## 📈 Optimisations Vercel

### 1. Enable Edge Network

Dans les paramètres Vercel, activez :
- **Edge Network** : Pour une distribution mondiale
- **Automatic Compression** : Pour compresser les assets

### 2. Headers personnalisés

Créez `vercel.json` :

```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-XSS-Protection",
          "value": "1; mode=block"
        }
      ]
    },
    {
      "source": "/sitemap.xml",
      "headers": [
        {
          "key": "Content-Type",
          "value": "application/xml"
        },
        {
          "key": "Cache-Control",
          "value": "public, max-age=3600, s-maxage=3600"
        }
      ]
    }
  ]
}
```

### 3. Redirection www vers non-www

Dans `vercel.json` :

```json
{
  "redirects": [
    {
      "source": "https://www.quelartisan85.fr/:path*",
      "destination": "https://quelartisan85.fr/:path*",
      "permanent": true
    }
  ]
}
```

## 📊 Monitoring

### Analytics

Vercel fournit automatiquement :
- **Web Vitals** : Performance metrics
- **Real Experience Score** : Score basé sur les vrais utilisateurs
- **Traffic** : Nombre de visiteurs

### Logs

Consultez les logs de build et runtime dans le dashboard Vercel :
- **Deployments** > Sélectionnez un déploiement > **View Function Logs**

## 🔄 Workflow de développement

### 1. Développement local

```bash
npm run dev
```

### 2. Test du build localement

```bash
npm run build
npm run serve
```

### 3. Push vers GitHub

```bash
git add .
git commit -m "Votre message"
git push origin main
```

### 4. Déploiement automatique

Vercel détecte le push et lance automatiquement le build.

## 🎯 Checklist finale

Avant de marquer le déploiement comme réussi :

- [ ] Build Vercel terminé sans erreur
- [ ] 7 074 pages accessibles
- [ ] Sitemap.xml accessible avec 7 074 URLs
- [ ] HTML pré-rendu visible dans le code source
- [ ] Test Google Rich Results réussi
- [ ] Performance acceptable (PageSpeed Insights)
- [ ] Domaine personnalisé configuré (si applicable)
- [ ] Sitemap soumis à Google Search Console
- [ ] Sitemap soumis à Bing Webmaster Tools

## 📞 Support Vercel

Si vous rencontrez des problèmes :

1. **Documentation Vercel** : https://vercel.com/docs
2. **Support Vercel** : https://vercel.com/support
3. **Discord Vercel** : https://vercel.com/discord

## 🎉 Résumé

✅ **Projet configuré** pour Vercel
✅ **cross-env** installé
✅ **7 074 pages** seront générées
✅ **Sitemap** complet sera créé
✅ **SEO** optimisé avec HTML pré-rendu

Le déploiement devrait se faire sans problème. Surveillez juste le temps de build qui peut être de 6-12 minutes en raison du grand nombre de pages.

---

**Dernière mise à jour** : 2026-01-19
**Statut build actuel** : En cours sur Vercel
