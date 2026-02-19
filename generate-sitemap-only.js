import { SitemapStream, streamToPromise, SitemapIndexStream } from 'sitemap';
import { writeFileSync, readFileSync, mkdirSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

// Import data files
const metiers = JSON.parse(readFileSync('./src/data/metiers.json', 'utf8'));
const villes = JSON.parse(readFileSync('./src/data/villes.json', 'utf8'));

const hostname = 'https://www.quelartisan85.fr';

console.log('📊 Data loaded:');
console.log(`   - ${metiers.length} métiers`);
console.log(`   - ${villes.length} villes`);

async function generateSitemap(urls, filename) {
  const sitemap = new SitemapStream({ hostname });
  for (const urlData of urls) {
    sitemap.write(urlData);
  }
  sitemap.end();
  const sitemapXML = await streamToPromise(sitemap);
  const outputPath = resolve(__dirname, 'dist', filename);
  writeFileSync(outputPath, sitemapXML.toString());
  console.log(`📄 Generated: ${filename} (${urls.length} URLs)`);
  return filename;
}

async function generateSitemapIndex(sitemapFiles) {
  const sitemapIndex = new SitemapIndexStream();
  for (const file of sitemapFiles) {
    sitemapIndex.write({
      url: `${hostname}/${file}`,
      lastmod: new Date().toISOString()
    });
  }
  sitemapIndex.end();
  const indexXML = await streamToPromise(sitemapIndex);
  const outputPath = resolve(__dirname, 'dist', 'sitemap.xml');
  writeFileSync(outputPath, indexXML.toString());
  console.log(`📋 Generated: sitemap.xml (index with ${sitemapFiles.length} sitemaps)`);
}

async function generateAllSitemaps() {
  const now = new Date().toISOString();
  const sitemapFiles = [];

  // Ensure dist folder exists
  mkdirSync(resolve(__dirname, 'dist'), { recursive: true });

  // 1. STATIC PAGES
  console.log('\n📦 Generating sitemap-pages.xml...');
  const staticUrls = [
    { url: '/', changefreq: 'daily', priority: 1.0, lastmod: now },
    { url: '/devis', changefreq: 'weekly', priority: 0.9, lastmod: now },
    { url: '/charte', changefreq: 'monthly', priority: 0.7, lastmod: now },
    { url: '/politique-confidentialite', changefreq: 'yearly', priority: 0.5, lastmod: now },
    { url: '/mentions-legales', changefreq: 'yearly', priority: 0.5, lastmod: now }
  ];
  await generateSitemap(staticUrls, 'sitemap-pages.xml');
  sitemapFiles.push('sitemap-pages.xml');

  // 2. BLOG
  console.log('\n📦 Generating sitemap-blog.xml...');
  const blogArticles = [
    'signification-reve-renovation-maison',
    'cout-renovation-appartement-haussmannien',
    'annulation-devis-signe-sans-acompte',
    'renovation-piscine-silico-marbreux',
    'devis-signe-sans-date-travaux',
    'rever-ancienne-maison',
    'rever-acheter-maison',
    'rever-intrusion-maison',
    'rever-grande-maison',
    'clim-couloir-refroidir-chambres',
    'choisir-son-artisan',
    'renovation-energetique-vendee',
    'travaux-hiver-vendee',
    'budget-travaux-2025'
  ];
  const blogUrls = [
    { url: '/blog', changefreq: 'weekly', priority: 0.8, lastmod: now },
    ...blogArticles.map(slug => ({
      url: `/blog/${slug}`,
      changefreq: 'monthly',
      priority: 0.6,
      lastmod: now
    }))
  ];
  await generateSitemap(blogUrls, 'sitemap-blog.xml');
  sitemapFiles.push('sitemap-blog.xml');

  // 3. MÉTIERS (Vendée)
  console.log('\n📦 Generating sitemap-metiers.xml...');
  const metierUrls = metiers.map(metier => ({
    url: `/${metier.slug}/vendee`,
    changefreq: 'weekly',
    priority: 0.8,
    lastmod: now
  }));
  await generateSitemap(metierUrls, 'sitemap-metiers.xml');
  sitemapFiles.push('sitemap-metiers.xml');

  // 4. MÉTIERS + VILLES
  console.log('\n📦 Generating sitemap-metiers-villes.xml...');
  const metierVilleUrls = [];
  for (const metier of metiers) {
    for (const ville of villes) {
      metierVilleUrls.push({
        url: `/${metier.slug}/${ville.slug}`,
        changefreq: 'weekly',
        priority: 0.7,
        lastmod: now
      });
    }
  }
  await generateSitemap(metierVilleUrls, 'sitemap-metiers-villes.xml');
  sitemapFiles.push('sitemap-metiers-villes.xml');

  // 5. SITEMAP INDEX
  console.log('\n📦 Generating sitemap.xml (index)...');
  await generateSitemapIndex(sitemapFiles);

  // SUMMARY
  console.log('');
  console.log('═══════════════════════════════════════════════════════════');
  console.log('🎉 SITEMAPS GENERATED SUCCESSFULLY!');
  console.log('═══════════════════════════════════════════════════════════');
  console.log('');
  console.log('📋 Sitemaps:');
  console.log('   └─ sitemap.xml (index)');
  console.log(`      ├─ sitemap-pages.xml (${staticUrls.length} URLs)`);
  console.log(`      ├─ sitemap-blog.xml (${blogUrls.length} URLs)`);
  console.log(`      ├─ sitemap-metiers.xml (${metierUrls.length} URLs)`);
  console.log(`      └─ sitemap-metiers-villes.xml (${metierVilleUrls.length} URLs)`);
  console.log('');
  const total = staticUrls.length + blogUrls.length + metierUrls.length + metierVilleUrls.length;
  console.log(`📊 Total: ${total} URLs`);
}

generateAllSitemaps().catch(console.error);
