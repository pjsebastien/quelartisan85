# Guide SSR et Pré-rendu - Quel Artisan 85

## Pourquoi le HTML n'apparaissait pas dans le code source ?

Votre site utilise React avec Vite, ce qui signifie qu'en **mode développement**, tout le contenu est rendu côté client (CSR - Client-Side Rendering). Le HTML de base ne contient qu'une div vide :

```html
<div id="root"><!--app-html--></div>
```

Le contenu est ensuite injecté par JavaScript après le chargement de la page. Les moteurs de recherche et les bots SEO ne voient donc pas le contenu réel.

## Solution mise en place

Le site est maintenant configuré avec :
1. **SSR (Server-Side Rendering)** : Configuration dans `vite.config.ts` et `entry-server.tsx`
2. **Pré-rendu statique** : Le script `generate-sitemap.js` génère toutes les pages en HTML statique
3. **Serveur Express** : Le fichier `server.js` sert les pages pré-rendues

## Comment ça fonctionne

### 1. Build en production

La commande `npm run build:windows` fait trois choses :

```bash
vite build                    # Build client normal
set SSR=true && vite build    # Build SSR dans dist-ssr/
node generate-sitemap.js      # Pré-rend toutes les pages
```

Cette commande génère :
- **7074 pages HTML** pré-rendues avec tout le contenu visible
- Un **sitemap.xml** complet
- Tous les fichiers dans le dossier `dist/`

### 2. Structure des fichiers générés

```
dist/
├── index.html                              # Page d'accueil pré-rendue
├── devis/index.html                        # Page devis pré-rendue
├── abattage-darbres/
│   ├── vendee/index.html                   # Page métier pour la Vendée
│   ├── la-roche-sur-yon/index.html        # Page métier + ville
│   └── ...
├── assets/                                 # JS et CSS
└── sitemap.xml                            # Sitemap complet
```

Chaque fichier `index.html` contient **tout le contenu HTML** de la page, visible par les moteurs de recherche.

### 3. Serveur de production

Le fichier `server.js` :
- Sert les fichiers statiques du dossier `dist/`
- Route les requêtes vers les bonnes pages pré-rendues
- Gère les routes dynamiques

## Commandes disponibles

### Développement (pas de SSR)
```bash
npm run dev
```
Lance Vite en mode développement. Le contenu n'est **pas** pré-rendu.

### Build complet avec SSR
```bash
npm run build:windows
```
Génère toutes les pages pré-rendues (Windows).

```bash
npm run build
```
Génère toutes les pages pré-rendues (Linux/Mac - nécessite cross-env).

### Servir les pages pré-rendues localement
```bash
npm run serve
```
Lance le serveur Express sur http://localhost:8080

### Prévisualisation Vite (sans SSR)
```bash
npm run preview
```
Lance le serveur de prévisualisation Vite (pas de pré-rendu).

## Vérifier que le HTML est bien pré-rendu

### Avec curl
```bash
curl http://localhost:8080/ | head -n 50
```

Vous devriez voir tout le contenu HTML dans la réponse, pas juste `<!--app-html-->`.

### Dans le navigateur
1. Lancez `npm run serve`
2. Ouvez http://localhost:8080
3. Faites clic droit > "Afficher le code source de la page"
4. Vous verrez tout le HTML complet dans `<div id="root">...</div>`

### Avec les DevTools
1. Ouvrez les DevTools (F12)
2. Onglet Network
3. Rechargez la page
4. Cliquez sur le document HTML principal
5. Dans l'onglet Response, vous verrez le HTML complet

## Déploiement en production

### Option 1 : Hébergement statique (recommandé)

Services compatibles : Netlify, Vercel, Cloudflare Pages, etc.

1. Build :
```bash
npm run build:windows
```

2. Uploadez le dossier `dist/` sur votre service d'hébergement

3. Configuration des redirections (exemple Netlify) :
Le fichier `dist/_redirects` devrait contenir :
```
/*    /index.html   200
```

### Option 2 : Serveur Node.js

1. Build :
```bash
npm run build:windows
```

2. Sur le serveur, installez les dépendances :
```bash
npm install --production
```

3. Lancez le serveur :
```bash
npm run serve
```

4. Configurez un reverse proxy (nginx, Apache) pour pointer vers le port 8080

## Vérification SEO

Une fois déployé, vérifiez que les moteurs de recherche voient bien le contenu :

### Avec Google Search Console
1. Allez dans "Inspection d'URL"
2. Testez une URL de votre site
3. Cliquez sur "Afficher la page explorée"
4. Vérifiez que le contenu est bien visible

### Avec les Rich Results Test
https://search.google.com/test/rich-results

### Avec curl
```bash
curl https://www.quelartisan85.fr/ | grep -o "<div id=\"root\">.*</div>" | head -c 500
```

Vous devriez voir du contenu HTML, pas juste `<!--app-html-->`.

## Statistiques du build

- **Total de pages pré-rendues** : 7074
- **Pages statiques** : 5 (accueil, devis, charte, etc.)
- **Pages blog** : 1 (liste des articles)
- **Pages métier (Vendée)** : 93 (un métier × Vendée)
- **Pages métier + ville** : 6975 (93 métiers × 75 villes)

## Résolution de problèmes

### Le serveur ne démarre pas (port occupé)
Changez le port dans `server.js` :
```javascript
const PORT = process.env.PORT || 8080; // Changez 8080
```

### Le build échoue sur Windows
Utilisez la commande Windows :
```bash
npm run build:windows
```

### Les pages ne sont pas pré-rendues
1. Vérifiez que `dist-ssr/entry-server.js` existe après le build
2. Vérifiez les logs du build pour voir si le pré-rendu s'est bien exécuté
3. Assurez-vous que toutes les dépendances sont installées

### Le contenu n'apparaît toujours pas
1. Vérifiez que vous utilisez `npm run serve`, pas `npm run preview`
2. Vérifiez le code source de la page, pas l'inspecteur d'éléments
3. Testez avec curl pour voir le HTML brut

## Architecture technique

### Fichiers clés

- **`index.html`** : Template de base HTML
- **`src/main.tsx`** : Point d'entrée client avec hydratation
- **`src/entry-server.tsx`** : Point d'entrée SSR
- **`vite.config.ts`** : Configuration Vite avec SSR
- **`generate-sitemap.js`** : Script de pré-rendu et génération du sitemap
- **`server.js`** : Serveur Express pour servir les pages pré-rendues

### Flux de rendu

1. **Build** : Vite compile le code React en JS/CSS
2. **SSR Build** : Vite compile le code pour Node.js
3. **Pré-rendu** : `generate-sitemap.js` :
   - Charge le module SSR
   - Pour chaque route, appelle `render(url)`
   - Injecte le HTML dans le template
   - Écrit le fichier HTML complet
4. **Production** : Le serveur Express sert les HTML pré-rendus

### Avantages de cette approche

- **SEO parfait** : Les moteurs de recherche voient tout le contenu
- **Performance** : Pas besoin de JavaScript pour voir le contenu initial
- **Scalabilité** : Les pages sont statiques, faciles à mettre en cache
- **Pas de serveur SSR** : Pas besoin de Node.js en production (avec hébergement statique)

## Support

Pour toute question ou problème, vérifiez :
1. Les logs du build
2. Les logs du serveur
3. Le code source de la page dans le navigateur
