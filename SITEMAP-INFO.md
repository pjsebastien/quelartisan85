# Guide du Sitemap - Quel Artisan 85

## Vue d'ensemble

Le sitemap de votre site contient **7 074 URLs** réparties en plusieurs catégories.

## Fichiers générés

Après le build (`npm run build:windows`), vous trouverez :

| Fichier | Description | Utilisation |
|---------|-------------|-------------|
| `dist/sitemap.xml` | Sitemap compressé (une ligne) | **Pour les moteurs de recherche** |
| `dist/sitemap-formatted.xml` | Sitemap formaté (lisible) | Pour la vérification humaine |
| `dist/sitemap-urls.txt` | Liste simple des URLs | Pour référence et debug |
| `dist/prerender-routes.txt` | Liste des routes pré-rendues | Pour vérification technique |

## Structure du sitemap

### 📊 Répartition des 7 074 pages

```
┌─────────────────────────────────┬──────────┐
│ Catégorie                       │ Nombre   │
├─────────────────────────────────┼──────────┤
│ Pages statiques                 │        5 │
│ Pages blog                      │        1 │
│ Pages métier + Vendée           │       93 │
│ Pages métier + ville            │    6 975 │
├─────────────────────────────────┼──────────┤
│ TOTAL                           │    7 074 │
└─────────────────────────────────┴──────────┘
```

### ✨ Pages statiques (5 pages)

- `/` - Page d'accueil (priority: 1.0, changefreq: daily)
- `/devis` - Page de devis (priority: 0.9, changefreq: weekly)
- `/charte` - Charte qualité (priority: 0.7, changefreq: monthly)
- `/politique-confidentialite` - Politique de confidentialité (priority: 0.5, changefreq: yearly)
- `/mentions-legales` - Mentions légales (priority: 0.5, changefreq: yearly)

### 📰 Pages blog (1 page)

- `/blog` - Liste des articles de blog (priority: 0.8, changefreq: monthly)

### 🏢 Pages métier + Vendée (93 pages)

Format: `/{métier}/vendee`

Exemples:
- `/fenetres/vendee`
- `/plombier/vendee`
- `/electricien/vendee`
- `/couvreur/vendee`
- etc.

**Priority**: 0.8
**Changefreq**: weekly

Ces pages présentent un métier spécifique pour l'ensemble du département de la Vendée.

### 🏘️ Pages métier + ville (6 975 pages)

Format: `/{métier}/{ville}`

La combinaison de **93 métiers × 75 villes** = 6 975 pages

Exemples:
- `/fenetres/la-roche-sur-yon`
- `/plombier/les-sables-dolonne`
- `/electricien/challans`
- `/couvreur/montaigu-vendee`
- etc.

**Priority**: 0.7
**Changefreq**: weekly

Ces pages présentent un métier spécifique pour une ville précise.

## Métiers couverts (93 métiers)

Le sitemap couvre 93 métiers différents, incluant :

### Menuiserie & Fermetures
- Fenêtres
- Portes d'entrée
- Portes de garage
- Volets roulants
- Portails
- Vérandas
- Pergolas

### Toiture & Couverture
- Couvreur
- Zingueur
- Démoussage toiture
- Charpente
- Isolation combles

### Chauffage & Climatisation
- Pompe à chaleur
- Chaudière
- Poêle à bois
- Climatisation
- VMC

### Électricité & Domotique
- Électricien
- Borne de recharge
- Domotique
- Alarme

### Plomberie & Sanitaire
- Plombier
- Salle de bain
- Adoucisseur d'eau

### Construction & Rénovation
- Maçon
- Peintre
- Carreleur
- Parqueteur
- Plaquiste

### Extérieur & Aménagement
- Paysagiste
- Terrassement
- Piscine
- VRD
- Clôtures

Et bien d'autres...

## Villes couvertes (75 villes)

Les principales villes de Vendée sont couvertes :

### Grandes villes
- La Roche-sur-Yon
- Les Sables-d'Olonne
- Challans
- Montaigu-Vendée
- Les Herbiers
- Fontenay-le-Comte
- Saint-Hilaire-de-Riez
- Luçon
- Saint-Jean-de-Monts

### Et 66 autres villes...

Chaque ville a 93 pages (une par métier).

## Commandes disponibles

### Analyser le sitemap

```bash
npm run analyze-sitemap
```

Cette commande affiche :
- ✅ Nombre total d'URLs
- ✅ Répartition par catégorie
- ✅ Exemples de pages
- ✅ Statistiques par ville et métier
- ✅ Génère un sitemap formaté

### Régénérer le sitemap

```bash
npm run build:windows
```

Cela régénère :
- Toutes les pages HTML pré-rendues
- Le sitemap.xml avec toutes les URLs
- Les fichiers associés

## Format du sitemap

### Structure XML standard

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://www.quelartisan85.fr/</loc>
    <lastmod>2026-01-19T12:45:24.585Z</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://www.quelartisan85.fr/fenetres/la-roche-sur-yon</loc>
    <lastmod>2026-01-19T12:45:24.585Z</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>
  <!-- ... 7 072 autres URLs ... -->
</urlset>
```

### Priorités définies

| Type de page | Priority | Changefreq |
|--------------|----------|------------|
| Accueil | 1.0 | daily |
| Devis | 0.9 | weekly |
| Blog | 0.8 | monthly |
| Métier + Vendée | 0.8 | weekly |
| Charte | 0.7 | monthly |
| Métier + Ville | 0.7 | weekly |
| Mentions/Politique | 0.5 | yearly |

## Soumission aux moteurs de recherche

### Google Search Console

1. Connectez-vous à [Google Search Console](https://search.google.com/search-console)
2. Allez dans **Sitemaps**
3. Ajoutez l'URL : `https://www.quelartisan85.fr/sitemap.xml`
4. Cliquez sur **Envoyer**

### Bing Webmaster Tools

1. Connectez-vous à [Bing Webmaster Tools](https://www.bing.com/webmasters)
2. Allez dans **Sitemaps**
3. Ajoutez l'URL : `https://www.quelartisan85.fr/sitemap.xml`
4. Cliquez sur **Soumettre**

### robots.txt

Ajoutez dans votre fichier `robots.txt` :

```
User-agent: *
Allow: /

Sitemap: https://www.quelartisan85.fr/sitemap.xml
```

## Vérification du sitemap

### En ligne

- **Google Search Console** - Inspection d'URL
- **Sitemap Validator** - https://www.xml-sitemaps.com/validate-xml-sitemap.html
- **Sitemap Checker** - https://technicalseo.com/tools/sitemap-check/

### En local

```bash
# Vérifier le nombre d'URLs
npm run analyze-sitemap

# Vérifier un URL spécifique
curl https://www.quelartisan85.fr/fenetres/la-roche-sur-yon

# Tester le sitemap XML
curl https://www.quelartisan85.fr/sitemap.xml | grep -c "<loc>"
```

## Maintenance

### Ajouter une nouvelle ville

1. Ajoutez la ville dans `src/data/villes.json`
2. Rebuild : `npm run build:windows`
3. 93 nouvelles pages seront créées automatiquement

### Ajouter un nouveau métier

1. Ajoutez le métier dans `src/data/metiers.json`
2. Rebuild : `npm run build:windows`
3. 76 nouvelles pages seront créées automatiquement (75 villes + 1 Vendée)

### Modifier les priorités

Éditez le fichier `generate-sitemap.js` :

```javascript
// Exemple : changer la priorité des pages métier + ville
sitemap.write({
  url: url,
  changefreq: 'weekly',
  priority: 0.8,  // Changez cette valeur
  lastmod: new Date().toISOString()
});
```

## Statistiques détaillées

### Taille des fichiers

- `sitemap.xml` : ~1.3 MB (compressé, une ligne)
- `sitemap-formatted.xml` : ~2.5 MB (formaté, lisible)
- `sitemap-urls.txt` : ~350 KB (liste simple)

### Couverture

- **93 métiers** différents
- **75 villes** de Vendée
- **6 975 combinaisons** métier × ville
- **99 pages** supplémentaires (statiques, blog, métier + Vendée)
- **7 074 pages** au total

### Impact SEO

Chaque page est :
- ✅ Indexable par Google
- ✅ Pré-rendue avec HTML complet
- ✅ Listée dans le sitemap
- ✅ Accessible aux robots

## Résolution de problèmes

### Le sitemap n'est pas généré

```bash
# Vérifiez que le build fonctionne
npm run build:windows

# Vérifiez que dist/sitemap.xml existe
ls -lh dist/sitemap.xml
```

### Le sitemap ne contient pas toutes les URLs

```bash
# Comptez les URLs
grep -o "</loc>" dist/sitemap.xml | wc -l

# Devrait afficher : 7074
```

### Le sitemap n'est pas lisible

```bash
# Générez la version formatée
npm run analyze-sitemap

# Consultez : dist/sitemap-formatted.xml
```

## Ressources

- [Protocole Sitemap](https://www.sitemaps.org/)
- [Google - Créer et soumettre un sitemap](https://developers.google.com/search/docs/advanced/sitemaps/build-sitemap)
- [Bing - Sitemaps](https://www.bing.com/webmasters/help/sitemaps-3b5cf6ed)

---

**Dernière mise à jour** : 2026-01-19
**Total d'URLs** : 7 074
**Statut** : ✅ Opérationnel
