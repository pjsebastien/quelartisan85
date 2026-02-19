import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import { readFileSync, writeFileSync, mkdirSync, readdirSync, unlinkSync } from 'fs';
import { SitemapStream, streamToPromise, SitemapIndexStream } from 'sitemap';

const __dirname = dirname(fileURLToPath(import.meta.url));

// Load data once
const metiers = JSON.parse(readFileSync('./src/data/metiers.json', 'utf8'));
const villes = JSON.parse(readFileSync('./src/data/villes.json', 'utf8'));

// Create lookup maps for fast access
const metiersBySlug = new Map(metiers.map(m => [m.slug, m]));
const villesBySlug = new Map(villes.map(v => [v.slug, v]));

console.log('🚀 Starting build process...\n');
console.log(`📊 Data loaded: ${metiers.length} métiers, ${villes.length} villes`);

// Blog articles list
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

const SITE_URL = 'https://www.quelartisan85.fr';

// Generate JSON-LD schemas
function generateJsonLd(url) {
  const schemas = [];

  // Organization schema (always present)
  const orgSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Quel Artisan 85',
    url: SITE_URL,
    logo: `${SITE_URL}/favicon.svg`,
    description: 'Plateforme de mise en relation avec des artisans qualifiés en Vendée (85).',
    address: { '@type': 'PostalAddress', addressRegion: 'Vendée', addressCountry: 'FR' },
    areaServed: { '@type': 'AdministrativeArea', name: 'Vendée' },
    contactPoint: { '@type': 'ContactPoint', contactType: 'customer service', email: 'contact@margouillapp.re', availableLanguage: 'French' }
  };
  schemas.push(orgSchema);

  // Trade page (métier/vendee) - LocalBusiness + Breadcrumb
  const tradeMatch = url.match(/^\/([^/]+)\/vendee$/);
  if (tradeMatch) {
    const metier = metiersBySlug.get(tradeMatch[1]);
    if (metier) {
      // LocalBusiness
      schemas.push({
        '@context': 'https://schema.org',
        '@type': 'LocalBusiness',
        name: `${metier.nom} en Vendée`,
        description: `Trouvez un ${metier.nom.toLowerCase()} qualifié en Vendée (85). Devis gratuits.`,
        url: `${SITE_URL}/${metier.slug}/vendee`,
        address: { '@type': 'PostalAddress', addressLocality: 'Vendée', postalCode: '85000', addressRegion: 'Vendée', addressCountry: 'FR' },
        areaServed: { '@type': 'AdministrativeArea', name: 'Vendée' },
        priceRange: metier.prix ? `${metier.prix}` : '€€'
      });
      // Breadcrumb
      schemas.push({
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Accueil', item: SITE_URL },
          { '@type': 'ListItem', position: 2, name: `${metier.nom} en Vendée`, item: `${SITE_URL}/${metier.slug}/vendee` }
        ]
      });
      // FAQPage if FAQ exists
      if (metier.faq && metier.faq.length > 0) {
        schemas.push({
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: metier.faq.slice(0, 5).map(f => ({
            '@type': 'Question',
            name: f.q.replace(/{ville}/g, 'Vendée').replace(/{code_postal}/g, '85').replace(/{departement}/g, 'Vendée'),
            acceptedAnswer: { '@type': 'Answer', text: f.r.replace(/{ville}/g, 'Vendée').replace(/{code_postal}/g, '85').replace(/{departement}/g, 'Vendée') }
          }))
        });
      }
    }
  }

  // Trade + City page (métier/ville) - LocalBusiness + Breadcrumb + FAQ
  const tradeCityMatch = url.match(/^\/([^/]+)\/([^/]+)$/);
  if (tradeCityMatch && tradeCityMatch[2] !== 'vendee') {
    const metier = metiersBySlug.get(tradeCityMatch[1]);
    const ville = villesBySlug.get(tradeCityMatch[2]);
    if (metier && ville) {
      // LocalBusiness
      schemas.push({
        '@context': 'https://schema.org',
        '@type': 'LocalBusiness',
        name: `${metier.nom} à ${ville.nom}`,
        description: `Trouvez un ${metier.nom.toLowerCase()} qualifié à ${ville.nom} (${ville.code_postal}). Devis gratuits.`,
        url: `${SITE_URL}/${metier.slug}/${ville.slug}`,
        address: { '@type': 'PostalAddress', addressLocality: ville.nom, postalCode: ville.code_postal, addressRegion: 'Vendée', addressCountry: 'FR' },
        areaServed: { '@type': 'City', name: ville.nom },
        priceRange: metier.prix ? `${metier.prix}` : '€€'
      });
      // Breadcrumb
      schemas.push({
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Accueil', item: SITE_URL },
          { '@type': 'ListItem', position: 2, name: `${metier.nom} en Vendée`, item: `${SITE_URL}/${metier.slug}/vendee` },
          { '@type': 'ListItem', position: 3, name: ville.nom, item: `${SITE_URL}/${metier.slug}/${ville.slug}` }
        ]
      });
      // FAQPage if FAQ exists
      if (metier.faq && metier.faq.length > 0) {
        schemas.push({
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: metier.faq.slice(0, 5).map(f => ({
            '@type': 'Question',
            name: f.q.replace(/{ville}/g, ville.nom).replace(/{code_postal}/g, ville.code_postal).replace(/{departement}/g, 'Vendée'),
            acceptedAnswer: { '@type': 'Answer', text: f.r.replace(/{ville}/g, ville.nom).replace(/{code_postal}/g, ville.code_postal).replace(/{departement}/g, 'Vendée') }
          }))
        });
      }
    }
  }

  // Blog article - Article schema + Breadcrumb
  if (url.startsWith('/blog/') && url !== '/blog') {
    const slug = url.replace('/blog/', '');
    const title = slug.replace(/-/g, ' ');
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: title,
      description: `Article sur ${title} - Conseils et informations.`,
      url: `${SITE_URL}${url}`,
      author: { '@type': 'Organization', name: 'Quel Artisan 85' },
      publisher: { '@type': 'Organization', name: 'Quel Artisan 85', logo: { '@type': 'ImageObject', url: `${SITE_URL}/favicon.svg` } },
      datePublished: new Date().toISOString(),
      dateModified: new Date().toISOString()
    });
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Accueil', item: SITE_URL },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: `${SITE_URL}/blog` },
        { '@type': 'ListItem', position: 3, name: title, item: `${SITE_URL}${url}` }
      ]
    });
  }

  // Blog listing - Breadcrumb
  if (url === '/blog') {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Accueil', item: SITE_URL },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: `${SITE_URL}/blog` }
      ]
    });
  }

  return schemas;
}

// Generate SEO metadata based on URL
function generateSEOMetadata(url) {

  // Homepage
  if (url === '/') {
    return {
      title: 'Quel Artisan 85 - Devis gratuits d\'artisans en Vendée - 2 min chrono !',
      description: 'Trouvez rapidement un artisan fiable en Vendée (85). Devis gratuits pour tous vos travaux : plomberie, électricité, toiture, isolation. Plus de 500 artisans partenaires.',
      canonical: SITE_URL
    };
  }

  // Devis page
  if (url === '/devis') {
    return {
      title: 'Demande de devis gratuit - Artisans en Vendée (85) - Quel Artisan 85',
      description: 'Demandez votre devis gratuit d\'artisans en Vendée. Service rapide, artisans vérifiés.',
      canonical: `${SITE_URL}/devis`
    };
  }

  // Charte page
  if (url === '/charte') {
    return {
      title: 'Charte qualité - Quel Artisan 85',
      description: 'Découvrez notre charte qualité pour les artisans en Vendée.',
      canonical: `${SITE_URL}/charte`
    };
  }

  // Privacy page
  if (url === '/politique-confidentialite') {
    return {
      title: 'Politique de confidentialité - Quel Artisan 85',
      description: 'Politique de confidentialité et protection des données de Quel Artisan 85.',
      canonical: `${SITE_URL}/politique-confidentialite`
    };
  }

  // Legal page
  if (url === '/mentions-legales') {
    return {
      title: 'Mentions légales - Quel Artisan 85',
      description: 'Mentions légales du site Quel Artisan 85.',
      canonical: `${SITE_URL}/mentions-legales`
    };
  }

  // Blog listing
  if (url === '/blog') {
    return {
      title: 'Blog - Conseils d\'experts artisans en Vendée - Quel Artisan 85',
      description: 'Découvrez nos conseils d\'experts pour vos travaux en Vendée.',
      canonical: `${SITE_URL}/blog`
    };
  }

  // Blog article
  if (url.startsWith('/blog/')) {
    const slug = url.replace('/blog/', '');
    return {
      title: `${slug.replace(/-/g, ' ')} - Blog Quel Artisan 85`,
      description: `Article sur ${slug.replace(/-/g, ' ')} - Conseils et informations.`,
      canonical: `${SITE_URL}${url}`,
      ogType: 'article'
    };
  }

  // Trade page (métier/vendee)
  const tradeMatch = url.match(/^\/([^/]+)\/vendee$/);
  if (tradeMatch) {
    const tradeSlug = tradeMatch[1];
    const metier = metiersBySlug.get(tradeSlug);
    if (metier) {
      return {
        title: `${metier.nom} en Vendée (85) - Devis gratuit - Quel Artisan 85`,
        description: `Trouvez un ${metier.nom.toLowerCase()} qualifié en Vendée. Devis gratuits et rapides. Artisans certifiés près de chez vous.`,
        canonical: `${SITE_URL}/${tradeSlug}/vendee`
      };
    }
  }

  // Trade + City page (métier/ville)
  const tradeCityMatch = url.match(/^\/([^/]+)\/([^/]+)$/);
  if (tradeCityMatch) {
    const [, tradeSlug, citySlug] = tradeCityMatch;
    if (citySlug !== 'vendee') {
      const metier = metiersBySlug.get(tradeSlug);
      const ville = villesBySlug.get(citySlug);
      if (metier && ville) {
        return {
          title: `${metier.nom} à ${ville.nom} (${ville.code_postal}) - Devis gratuit en 2 min !`,
          description: `Trouvez un ${metier.nom.toLowerCase()} qualifié à ${ville.nom} (${ville.code_postal}). Devis gratuits et rapides. Artisans certifiés près de chez vous en Vendée.`,
          canonical: `${SITE_URL}/${tradeSlug}/${citySlug}`
        };
      }
    }
  }

  // Default fallback
  return {
    title: 'Quel Artisan 85 - Artisans en Vendée',
    description: 'Trouvez un artisan qualifié en Vendée (85).',
    canonical: `${SITE_URL}${url}`
  };
}

// Run shell command
function runCommand(command, args, env = {}) {
  return new Promise((resolve, reject) => {
    console.log(`📦 Running: ${command} ${args.join(' ')}`);
    const child = spawn(command, args, {
      cwd: __dirname,
      env: { ...process.env, ...env },
      stdio: 'inherit',
      shell: true
    });
    child.on('close', code => code !== 0 ? reject(new Error(`Exit code ${code}`)) : resolve());
    child.on('error', reject);
  });
}

// Generate sitemaps
async function generateSitemaps() {
  const hostname = 'https://www.quelartisan85.fr';
  const now = new Date().toISOString();
  const sitemapFiles = [];

  async function writeSitemap(urls, filename) {
    const sitemap = new SitemapStream({ hostname });
    urls.forEach(u => sitemap.write(u));
    sitemap.end();
    const xml = await streamToPromise(sitemap);
    writeFileSync(resolve(__dirname, 'dist', filename), xml.toString());
    console.log(`   ✅ ${filename} (${urls.length} URLs)`);
    return filename;
  }

  console.log('\n📄 Generating sitemaps...');

  // Static pages
  const staticUrls = [
    { url: '/', changefreq: 'daily', priority: 1.0, lastmod: now },
    { url: '/devis', changefreq: 'weekly', priority: 0.9, lastmod: now },
    { url: '/charte', changefreq: 'monthly', priority: 0.7, lastmod: now },
    { url: '/politique-confidentialite', changefreq: 'yearly', priority: 0.5, lastmod: now },
    { url: '/mentions-legales', changefreq: 'yearly', priority: 0.5, lastmod: now }
  ];
  sitemapFiles.push(await writeSitemap(staticUrls, 'sitemap-pages.xml'));

  // Blog - scan all HTML files from public/blog
  const blogDir = resolve(__dirname, 'public/blog');
  const blogFiles = readdirSync(blogDir).filter(f => f.endsWith('.html') && f !== 'index.html');
  const allBlogSlugs = blogFiles.map(f => f.replace('.html', ''));

  const blogUrls = [
    { url: '/blog', changefreq: 'weekly', priority: 0.8, lastmod: now },
    ...allBlogSlugs.map(slug => ({ url: `/blog/${slug}`, changefreq: 'monthly', priority: 0.6, lastmod: now }))
  ];
  sitemapFiles.push(await writeSitemap(blogUrls, 'sitemap-blog.xml'));

  // Métiers/Vendée
  const metierUrls = metiers.map(m => ({ url: `/${m.slug}/vendee`, changefreq: 'weekly', priority: 0.8, lastmod: now }));
  sitemapFiles.push(await writeSitemap(metierUrls, 'sitemap-metiers.xml'));

  // Métiers + Villes
  const metierVilleUrls = [];
  metiers.forEach(m => villes.forEach(v => {
    metierVilleUrls.push({ url: `/${m.slug}/${v.slug}`, changefreq: 'weekly', priority: 0.7, lastmod: now });
  }));
  sitemapFiles.push(await writeSitemap(metierVilleUrls, 'sitemap-metiers-villes.xml'));

  // Index
  const sitemapIndex = new SitemapIndexStream();
  sitemapFiles.forEach(f => sitemapIndex.write({ url: `${hostname}/${f}`, lastmod: now }));
  sitemapIndex.end();
  const indexXml = await streamToPromise(sitemapIndex);
  writeFileSync(resolve(__dirname, 'dist', 'sitemap.xml'), indexXml.toString());

  const total = staticUrls.length + blogUrls.length + metierUrls.length + metierVilleUrls.length;
  console.log(`\n✅ Sitemaps: ${total} URLs total`);
  return { staticUrls, blogUrls, metierUrls, metierVilleUrls };
}

// Prerender all pages
async function prerenderAllPages() {
  let render;
  try {
    const ssrModule = await import('./dist-ssr/entry-server.js');
    render = ssrModule.render;
    console.log('\n✅ SSR module loaded');
  } catch (error) {
    console.error('❌ SSR module failed:', error.message);
    return { total: 0, failed: 0 };
  }

  const baseHtml = readFileSync(resolve(__dirname, 'dist/index.html'), 'utf8');
  let total = 0, failed = 0;

  function prerenderPage(url, outputPath) {
    try {
      const appHtml = render(url);
      const seo = generateSEOMetadata(url);
      const jsonLdSchemas = generateJsonLd(url);

      // Generate JSON-LD script tag
      const jsonLdScript = `<script type="application/ld+json">\n${JSON.stringify(jsonLdSchemas, null, 2)}\n    </script>`;

      let html = baseHtml
        .replace('<!--app-html-->', appHtml)
        // Title & Description
        .replace(/<title>[^<]*<\/title>/, `<title>${seo.title}</title>`)
        .replace(/<meta name="description" content="[^"]*"/, `<meta name="description" content="${seo.description}"`)
        // Canonical - replace existing
        .replace(/<link rel="canonical" href="[^"]*"/, `<link rel="canonical" href="${seo.canonical}"`)
        // OpenGraph tags
        .replace(/<meta property="og:title" content="[^"]*"/, `<meta property="og:title" content="${seo.title}"`)
        .replace(/<meta property="og:description" content="[^"]*"/, `<meta property="og:description" content="${seo.description}"`)
        .replace(/<meta property="og:url" content="[^"]*"/, `<meta property="og:url" content="${seo.canonical}"`)
        .replace(/<meta property="og:type" content="[^"]*"/, `<meta property="og:type" content="${seo.ogType || 'website'}"`)
        // Twitter Cards
        .replace(/<meta name="twitter:title" content="[^"]*"/, `<meta name="twitter:title" content="${seo.title}"`)
        .replace(/<meta name="twitter:description" content="[^"]*"/, `<meta name="twitter:description" content="${seo.description}"`)
        // Replace existing JSON-LD with new schemas
        .replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>/, jsonLdScript);

      mkdirSync(dirname(outputPath), { recursive: true });
      writeFileSync(outputPath, html, 'utf8');
      total++;
      return true;
    } catch (error) {
      console.error(`   ❌ ${url}: ${error.message}`);
      failed++;
      return false;
    }
  }

  // Static pages
  console.log('\n🔧 Prerendering static pages...');
  [
    ['/', 'dist/index.html'],
    ['/devis', 'dist/devis/index.html'],
    ['/charte', 'dist/charte/index.html'],
    ['/politique-confidentialite', 'dist/politique-confidentialite/index.html'],
    ['/mentions-legales', 'dist/mentions-legales/index.html']
  ].forEach(([url, path]) => prerenderPage(url, resolve(__dirname, path)));
  console.log(`   ✅ 5 static pages`);

  // Blog pages
  console.log('\n🔧 Prerendering blog pages...');
  prerenderPage('/blog', resolve(__dirname, 'dist/blog/index.html'));
  blogArticles.forEach(slug => prerenderPage(`/blog/${slug}`, resolve(__dirname, `dist/blog/${slug}/index.html`)));
  console.log(`   ✅ ${blogArticles.length + 1} blog pages`);

  // Métiers/Vendée
  console.log('\n🔧 Prerendering métiers/vendée...');
  metiers.forEach(m => prerenderPage(`/${m.slug}/vendee`, resolve(__dirname, `dist/${m.slug}/vendee/index.html`)));
  console.log(`   ✅ ${metiers.length} métiers/vendée pages`);

  // Métiers + Villes (batch logging)
  console.log('\n🔧 Prerendering métiers+villes...');
  const totalMV = metiers.length * villes.length;
  let count = 0;
  for (const metier of metiers) {
    for (const ville of villes) {
      prerenderPage(`/${metier.slug}/${ville.slug}`, resolve(__dirname, `dist/${metier.slug}/${ville.slug}/index.html`));
      count++;
    }
    // Log progress every métier
    console.log(`   📊 ${count}/${totalMV} (${Math.round(count/totalMV*100)}%) - ${metier.nom}`);
  }

  console.log('\n═══════════════════════════════════════════════════════════');
  console.log(`🎉 PRERENDERING COMPLETED: ${total} pages`);
  if (failed > 0) console.log(`⚠️  Failed: ${failed}`);
  console.log('═══════════════════════════════════════════════════════════');

  return { total, failed };
}

// Process static blog HTML files (from public/blog/)
// Move to _content subdirectory so they're not directly accessible via URL
function processBlogStaticFiles() {
  const blogDir = resolve(__dirname, 'dist/blog');
  const contentDir = resolve(blogDir, '_content');
  const files = readdirSync(blogDir).filter(f => f.endsWith('.html') && f !== 'index.html');

  // Create _content subdirectory
  mkdirSync(contentDir, { recursive: true });

  console.log('\n🔧 Moving static blog HTML files to _content/...');
  let processed = 0;

  for (const file of files) {
    const sourcePath = resolve(blogDir, file);
    const destPath = resolve(contentDir, file);

    // Read the original file
    const html = readFileSync(sourcePath, 'utf8');

    // Write to _content subdirectory (content only, no SEO needed since React handles SEO)
    writeFileSync(destPath, html, 'utf8');

    // Delete the original file from dist/blog/ to prevent direct access
    unlinkSync(sourcePath);

    processed++;
  }

  console.log(`   ✅ ${processed} static blog files moved to _content/`);
  return processed;
}

// Main build
async function build() {
  try {
    const expectedPages = 5 + 15 + metiers.length + (metiers.length * villes.length);
    console.log(`\n📊 Expected: ${expectedPages} pages\n`);

    // Step 1: Client build
    console.log('📦 Step 1/5: Building client...');
    await runCommand('npx', ['vite', 'build']);
    console.log('✅ Client build done\n');

    // Step 2: SSR build
    console.log('📦 Step 2/5: Building SSR...');
    await runCommand('npx', ['vite', 'build'], { SSR: 'true' });
    console.log('✅ SSR build done\n');

    // Step 3: Generate sitemaps
    console.log('📦 Step 3/5: Generating sitemaps...');
    await generateSitemaps();

    // Step 4: Process static blog files
    console.log('\n📦 Step 4/5: Processing static blog files...');
    processBlogStaticFiles();

    // Step 5: Prerender pages
    console.log('\n📦 Step 5/5: Prerendering pages...');
    const { total, failed } = await prerenderAllPages();

    console.log('\n🎉 BUILD COMPLETED!');
    console.log(`📊 Total: ${total} pages prerendered`);

  } catch (error) {
    console.error('❌ Build failed:', error.message);
    process.exit(1);
  }
}

build();
