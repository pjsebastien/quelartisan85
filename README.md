# Quel Artisan 85

Site web de mise en relation avec des artisans en Vendée (85).

## 🎯 Vue d'ensemble

- **7 074 pages** HTML pré-rendues avec SSR
- **Sitemap complet** avec toutes les URLs
- **SEO optimisé** - contenu visible par les moteurs de recherche
- **93 métiers** × **75 villes** de Vendée

## 🚀 Démarrage rapide

### Installation

```bash
npm install
```

### Développement

```bash
npm run dev
```

Ouvre le site sur http://localhost:5173

⚠️ Note : En mode développement, le HTML n'est **pas** pré-rendu (c'est normal).

### Build production

```bash
# Sur Windows
npm run build:windows

# Sur Linux/Mac
npm run build
```

Génère 7 074 pages HTML pré-rendues dans le dossier `dist/`.

### Servir en local

```bash
npm run serve
```

Ouvre le site sur http://localhost:8080 avec toutes les pages pré-rendues.

## 📊 Statistiques

```
Pages statiques              :        5
Pages blog                   :        1
Pages métier + Vendée        :       93
Pages métier + ville         :    6 975
─────────────────────────────────────────
TOTAL                        :    7 074
```

## 🛠️ Commandes disponibles

| Commande | Description |
|----------|-------------|
| `npm run dev` | Lance le serveur de développement |
| `npm run build` | Build complet avec SSR (Linux/Mac) |
| `npm run build:windows` | Build complet avec SSR (Windows) |
| `npm run serve` | Lance le serveur de production en local |
| `npm run demo` | Démonstration avant/après SSR |
| `npm run analyze-sitemap` | Analyse le sitemap généré |
| `npm run lint` | Vérifie le code avec ESLint |
| `npm run preview` | Prévisualise le build Vite |

## 📁 Structure du projet

```
quelartisan85/
├── src/
│   ├── components/        # Composants React
│   ├── pages/            # Pages de l'application
│   ├── data/             # Données (métiers, villes)
│   ├── utils/            # Utilitaires
│   ├── main.tsx          # Point d'entrée client
│   ├── entry-server.tsx  # Point d'entrée SSR
│   └── App.tsx           # Composant principal
│
├── dist/                 # Pages pré-rendues (après build)
├── dist-ssr/            # Build SSR pour Node.js
├── public/              # Fichiers statiques
│
├── server.js            # Serveur Express pour production
├── generate-sitemap.js  # Script de génération sitemap + pré-rendu
├── vite.config.ts       # Configuration Vite avec SSR
└── package.json         # Dépendances et scripts
```

## 🌐 Déploiement

### Vercel (Recommandé)

Le projet est configuré pour Vercel. Le déploiement se fait automatiquement :

1. Connectez votre repo GitHub à Vercel
2. Vercel détecte automatiquement Vite
3. Le build se lance avec `npm run build`
4. Les pages pré-rendues sont déployées

### Netlify

1. Build : `npm run build`
2. Dossier à déployer : `dist/`
3. Redirections : Créez `dist/_redirects` avec `/* /index.html 200`

### Serveur Node.js

```bash
# Sur le serveur
npm install --production
npm run build
npm run serve

# Avec PM2
pm2 start npm --name "quelartisan85" -- run serve
```

## 🔍 Vérification SEO

### Vérifier le HTML pré-rendu

1. Ouvrez une page
2. Clic droit > "Afficher le code source"
3. Cherchez `<div id="root">`
4. ✅ Vous devez voir tout le HTML, pas juste `<!--app-html-->`

### Vérifier le sitemap

```bash
npm run analyze-sitemap
```

Affiche :
- Nombre total d'URLs
- Répartition par catégorie
- Exemples de pages
- Statistiques détaillées

## 📚 Documentation complète

| Document | Contenu |
|----------|---------|
| [README.md](README.md) | Ce fichier - Vue d'ensemble |
| [README-SSR.md](README-SSR.md) | Guide complet du SSR |
| [SITEMAP-INFO.md](SITEMAP-INFO.md) | Tout sur le sitemap |
| [COMPLETE-SETUP.md](COMPLETE-SETUP.md) | Configuration complète |
| [RESUME-IMPLEMENTATION.md](RESUME-IMPLEMENTATION.md) | Résumé technique |

## 🛠️ Stack technique

- **React 18** - Interface utilisateur
- **TypeScript** - Typage statique
- **Vite 5** - Build tool et SSR
- **React Router 7** - Routing
- **Tailwind CSS** - Styles
- **Express** - Serveur de production
- **Supabase** - Backend (si utilisé)

## 🔧 Maintenance

### Ajouter une nouvelle ville

1. Éditez `src/data/villes.json`
2. Lancez `npm run build`
3. 93 nouvelles pages seront créées

### Ajouter un nouveau métier

1. Éditez `src/data/metiers.json`
2. Lancez `npm run build`
3. 76 nouvelles pages seront créées (75 villes + Vendée)

## 📝 Licence

Propriétaire - Tous droits réservés

## 📞 Support

Pour toute question ou problème :
1. Consultez la [documentation](README-SSR.md)
2. Vérifiez les [problèmes courants](README-SSR.md#résolution-de-problèmes)
3. Lancez `npm run demo` pour voir une démonstration

---

**Dernière mise à jour** : 2026-01-19
**Version** : 1.0.0
**Statut** : ✅ Production Ready
