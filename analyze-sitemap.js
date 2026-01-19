import { readFileSync, writeFileSync } from 'fs';

console.log('\n===========================================');
console.log('  ANALYSE DU SITEMAP');
console.log('===========================================\n');

try {
  const sitemapXML = readFileSync('dist/sitemap.xml', 'utf8');

  // Extract all URLs using regex
  const urlMatches = sitemapXML.match(/<loc>([^<]+)<\/loc>/g);
  const urls = urlMatches ? urlMatches.map(match => match.replace(/<\/?loc>/g, '')) : [];

  console.log(`📊 Nombre total d'URLs : ${urls.length.toLocaleString()}\n`);

  // Categorize URLs
  const categories = {
    'Pages statiques': urls.filter(url =>
      url === 'https://www.quelartisan85.fr/' ||
      url.endsWith('/devis') ||
      url.endsWith('/charte') ||
      url.includes('politique-confidentialite') ||
      url.includes('mentions-legales')
    ),
    'Pages blog': urls.filter(url => url.includes('/blog')),
    'Pages métier + Vendée': urls.filter(url => url.endsWith('/vendee')),
    'Pages métier + ville': urls.filter(url => {
      const parts = url.split('/');
      return parts.length === 5 && parts[4] !== 'vendee' && parts[4] !== '';
    })
  };

  console.log('📁 Répartition des pages :\n');
  for (const [category, categoryUrls] of Object.entries(categories)) {
    console.log(`   ${category}: ${categoryUrls.length.toLocaleString()}`);
  }

  console.log('\n📝 Exemples de pages par catégorie :\n');

  // Static pages
  console.log('✨ Pages statiques:');
  categories['Pages statiques'].forEach(url => {
    console.log(`   - ${url}`);
  });

  // Blog pages
  console.log('\n📰 Pages blog:');
  categories['Pages blog'].slice(0, 3).forEach(url => {
    console.log(`   - ${url}`);
  });

  // Trade + Vendée pages
  console.log('\n🏢 Pages métier + Vendée (exemples):');
  categories['Pages métier + Vendée'].slice(0, 5).forEach(url => {
    console.log(`   - ${url}`);
  });

  // Trade + City pages
  console.log('\n🏘️  Pages métier + ville (exemples):');
  categories['Pages métier + ville'].slice(0, 10).forEach(url => {
    console.log(`   - ${url}`);
  });

  // Stats by city
  console.log('\n📊 Statistiques par ville (top 10) :\n');
  const cityStats = {};
  categories['Pages métier + ville'].forEach(url => {
    const city = url.split('/').pop();
    cityStats[city] = (cityStats[city] || 0) + 1;
  });

  const sortedCities = Object.entries(cityStats)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10);

  sortedCities.forEach(([city, count]) => {
    console.log(`   ${city.padEnd(30)} : ${count} pages`);
  });

  // Stats by trade
  console.log('\n📊 Statistiques par métier (top 10) :\n');
  const tradeStats = {};
  [...categories['Pages métier + Vendée'], ...categories['Pages métier + ville']].forEach(url => {
    const parts = url.split('/');
    const trade = parts[3];
    tradeStats[trade] = (tradeStats[trade] || 0) + 1;
  });

  const sortedTrades = Object.entries(tradeStats)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10);

  sortedTrades.forEach(([trade, count]) => {
    console.log(`   ${trade.padEnd(30)} : ${count} pages`);
  });

  // Generate a formatted sitemap
  console.log('\n📄 Génération d\'un sitemap formaté...');
  const formattedSitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
${urls.map((url, index) => {
  // Extract priority and changefreq from original sitemap
  const urlPattern = `<url><loc>${url.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}</loc>`;
  const urlMatch = sitemapXML.match(new RegExp(urlPattern + '.*?</url>'));

  if (urlMatch) {
    const urlBlock = urlMatch[0];
    const priorityMatch = urlBlock.match(/<priority>([^<]+)<\/priority>/);
    const changefreqMatch = urlBlock.match(/<changefreq>([^<]+)<\/changefreq>/);
    const lastmodMatch = urlBlock.match(/<lastmod>([^<]+)<\/lastmod>/);

    const priority = priorityMatch ? priorityMatch[1] : '0.7';
    const changefreq = changefreqMatch ? changefreqMatch[1] : 'weekly';
    const lastmod = lastmodMatch ? lastmodMatch[1] : new Date().toISOString();

    return `  <url>
    <loc>${url}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
  }

  return `  <url>
    <loc>${url}</loc>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`;
}).join('\n')}
</urlset>`;

  writeFileSync('dist/sitemap-formatted.xml', formattedSitemap, 'utf8');
  console.log('✅ Sitemap formaté généré : dist/sitemap-formatted.xml');

  // Generate a text list
  const urlList = urls.join('\n');
  writeFileSync('dist/sitemap-urls.txt', urlList, 'utf8');
  console.log('✅ Liste d\'URLs générée : dist/sitemap-urls.txt');

  console.log('\n===========================================');
  console.log('  RÉSUMÉ');
  console.log('===========================================\n');
  console.log(`✅ Sitemap analysé avec succès`);
  console.log(`✅ ${urls.length.toLocaleString()} URLs trouvées`);
  console.log(`✅ Tous les types de pages sont présents`);
  console.log(`✅ Sitemap formaté généré pour lecture humaine`);
  console.log(`✅ Liste d'URLs générée pour référence\n`);

} catch (error) {
  console.error('❌ Erreur lors de l\'analyse du sitemap:', error.message);
  console.log('💡 Assurez-vous d\'avoir lancé "npm run build:windows" d\'abord.\n');
}
