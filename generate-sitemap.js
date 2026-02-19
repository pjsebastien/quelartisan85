import { SitemapStream, streamToPromise, SitemapIndexStream } from 'sitemap';
import { writeFileSync, readFileSync, mkdirSync } from 'fs';
import { resolve, dirname, join } from 'path';
import { fileURLToPath } from 'url';

// Get __dirname equivalent in ES modules
const __dirname = dirname(fileURLToPath(import.meta.url));

// Import data files
const metiers = JSON.parse(readFileSync('./src/data/metiers.json', 'utf8'));
const villes = JSON.parse(readFileSync('./src/data/villes.json', 'utf8'));

// Import the SSR render function
let render;
try {
  const ssrModule = await import('./dist-ssr/entry-server.js');
  render = ssrModule.render;
  console.log('✅ SSR render function loaded successfully');
} catch (error) {
  console.error('❌ Failed to load SSR render function:', error.message);
  process.exit(1);
}

// Read the base HTML template
const baseHtmlPath = resolve(__dirname, 'dist/index.html');
let baseHtml;
try {
  baseHtml = readFileSync(baseHtmlPath, 'utf8');
  console.log('✅ Base HTML template loaded');
} catch (error) {
  console.error('❌ Failed to read base HTML template:', error.message);
  process.exit(1);
}

const hostname = 'https://www.quelartisan85.fr';

/**
 * Extract title and meta description from rendered HTML
 */
function extractMetadata(html) {
  const titleMatch = html.match(/<title[^>]*>([^<]*)<\/title>/i);
  const metaMatch = html.match(/<meta\s+name=["']description["']\s+content=["']([^"']*)["'][^>]*>/i);

  return {
    title: titleMatch ? titleMatch[1] : 'Quel Artisan 85',
    description: metaMatch ? metaMatch[1] : 'Trouvez rapidement un artisan fiable en Vendée'
  };
}

/**
 * Generate prerendered HTML for a specific route
 */
function prerenderRoute(url, outputPath) {
  try {
    console.log(`🔄 Prerendering: ${url} -> ${outputPath}`);

    // Render the route using SSR
    const appHtml = render(url);

    // Extract metadata from the rendered HTML
    const metadata = extractMetadata(appHtml);

    // Replace placeholders in base HTML
    let finalHtml = baseHtml
      .replace('<!--app-html-->', appHtml)
      .replace(/<title[^>]*>([^<]*)<\/title>/i, `<title>${metadata.title}</title>`)
      .replace(/<meta\s+name=["']description["']\s+content=["'][^"']*["'][^>]*>/i,
        `<meta name="description" content="${metadata.description}" />`);

    // Ensure output directory exists
    const outputDir = dirname(outputPath);
    mkdirSync(outputDir, { recursive: true });

    // Write the prerendered HTML
    writeFileSync(outputPath, finalHtml, 'utf8');

    console.log(`✅ Generated: ${outputPath}`);
    return true;
  } catch (error) {
    console.error(`❌ Failed to prerender ${url}:`, error.message);
    return false;
  }
}

/**
 * Generate a single sitemap file
 */
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

/**
 * Generate sitemap index file
 */
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

async function generateSitemapAndPrerender() {
  const now = new Date().toISOString();
  const prerenderRoutes = [];
  const sitemapFiles = [];

  // ============================================
  // 1. STATIC PAGES SITEMAP
  // ============================================
  console.log('\n📦 Generating sitemap-pages.xml...');

  const staticPages = [
    { url: '/', changefreq: 'daily', priority: 1.0, outputPath: 'dist/index.html' },
    { url: '/devis', changefreq: 'weekly', priority: 0.9, outputPath: 'dist/devis/index.html' },
    { url: '/charte', changefreq: 'monthly', priority: 0.7, outputPath: 'dist/charte/index.html' },
    { url: '/politique-confidentialite', changefreq: 'yearly', priority: 0.5, outputPath: 'dist/politique-confidentialite/index.html' },
    { url: '/mentions-legales', changefreq: 'yearly', priority: 0.5, outputPath: 'dist/mentions-legales/index.html' }
  ];

  const staticUrls = [];
  for (const page of staticPages) {
    staticUrls.push({
      url: page.url,
      changefreq: page.changefreq,
      priority: page.priority,
      lastmod: now
    });
    prerenderRoutes.push(page.url);
    const outputPath = resolve(__dirname, page.outputPath);
    prerenderRoute(page.url, outputPath);
  }

  await generateSitemap(staticUrls, 'sitemap-pages.xml');
  sitemapFiles.push('sitemap-pages.xml');

  // ============================================
  // 2. BLOG SITEMAP
  // ============================================
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
    { url: '/blog', changefreq: 'weekly', priority: 0.8, lastmod: now }
  ];

  // Prerender blog listing page
  prerenderRoutes.push('/blog');
  prerenderRoute('/blog', resolve(__dirname, 'dist/blog/index.html'));

  for (const slug of blogArticles) {
    blogUrls.push({
      url: `/blog/${slug}`,
      changefreq: 'monthly',
      priority: 0.6,
      lastmod: now
    });
  }

  await generateSitemap(blogUrls, 'sitemap-blog.xml');
  sitemapFiles.push('sitemap-blog.xml');

  // ============================================
  // 3. TRADE PAGES (VENDÉE) SITEMAP
  // ============================================
  console.log('\n📦 Generating sitemap-metiers.xml...');

  const metierUrls = [];
  for (const metier of metiers) {
    const url = `/${metier.slug}/vendee`;
    metierUrls.push({
      url: url,
      changefreq: 'weekly',
      priority: 0.8,
      lastmod: now
    });
    prerenderRoutes.push(url);
    const outputPath = resolve(__dirname, `dist/${metier.slug}/vendee/index.html`);
    prerenderRoute(url, outputPath);
  }

  await generateSitemap(metierUrls, 'sitemap-metiers.xml');
  sitemapFiles.push('sitemap-metiers.xml');

  // ============================================
  // 4. TRADE + CITY PAGES SITEMAP
  // ============================================
  console.log('\n📦 Generating sitemap-metiers-villes.xml...');

  const metierVilleUrls = [];
  for (const metier of metiers) {
    for (const ville of villes) {
      const url = `/${metier.slug}/${ville.slug}`;
      metierVilleUrls.push({
        url: url,
        changefreq: 'weekly',
        priority: 0.7,
        lastmod: now
      });
      prerenderRoutes.push(url);
      const outputPath = resolve(__dirname, `dist/${metier.slug}/${ville.slug}/index.html`);
      prerenderRoute(url, outputPath);
    }
  }

  await generateSitemap(metierVilleUrls, 'sitemap-metiers-villes.xml');
  sitemapFiles.push('sitemap-metiers-villes.xml');

  // ============================================
  // 5. GENERATE SITEMAP INDEX
  // ============================================
  console.log('\n📦 Generating sitemap.xml (index)...');
  await generateSitemapIndex(sitemapFiles);

  // ============================================
  // 6. WRITE PRERENDER ROUTES FILE
  // ============================================
  const prerenderRoutesPath = resolve(__dirname, 'dist', 'prerender-routes.txt');
  writeFileSync(prerenderRoutesPath, prerenderRoutes.join('\n'));

  // ============================================
  // SUMMARY
  // ============================================
  console.log('');
  console.log('═══════════════════════════════════════════════════════════');
  console.log('🎉 BUILD COMPLETED SUCCESSFULLY!');
  console.log('═══════════════════════════════════════════════════════════');
  console.log('');
  console.log('📋 Sitemaps generated:');
  console.log('   └─ sitemap.xml (index)');
  console.log(`      ├─ sitemap-pages.xml (${staticUrls.length} URLs)`);
  console.log(`      ├─ sitemap-blog.xml (${blogUrls.length} URLs)`);
  console.log(`      ├─ sitemap-metiers.xml (${metierUrls.length} URLs)`);
  console.log(`      └─ sitemap-metiers-villes.xml (${metierVilleUrls.length} URLs)`);
  console.log('');
  console.log(`📊 Total: ${prerenderRoutes.length} pages prerendered`);
  console.log('');
  console.log('✅ All pages have been prerendered with full HTML content!');
  console.log('🔍 SEO crawlers will now see complete HTML for every page.');
  console.log('');
  console.log('📌 Next steps:');
  console.log('   1. Deploy to Vercel');
  console.log('   2. Submit sitemap.xml to Google Search Console');
  console.log('   3. Monitor indexation per sitemap section');
}

// Run the generator
generateSitemapAndPrerender().catch(console.error);
