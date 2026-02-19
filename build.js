import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import { readFileSync, writeFileSync, mkdirSync } from 'fs';
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

// Generate SEO metadata based on URL
function generateSEOMetadata(url) {
  const SITE_URL = 'https://www.quelartisan85.fr';

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
      canonical: `${SITE_URL}${url}`
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

  // Blog
  const blogUrls = [
    { url: '/blog', changefreq: 'weekly', priority: 0.8, lastmod: now },
    ...blogArticles.map(slug => ({ url: `/blog/${slug}`, changefreq: 'monthly', priority: 0.6, lastmod: now }))
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

      let html = baseHtml
        .replace('<!--app-html-->', appHtml)
        .replace(/<title>[^<]*<\/title>/, `<title>${seo.title}</title>`)
        .replace(/<meta name="description" content="[^"]*"/, `<meta name="description" content="${seo.description}"`);

      // Add canonical link if not present
      if (!html.includes('rel="canonical"')) {
        html = html.replace('</head>', `<link rel="canonical" href="${seo.canonical}" />\n</head>`);
      }

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

// Main build
async function build() {
  try {
    const expectedPages = 5 + 15 + metiers.length + (metiers.length * villes.length);
    console.log(`\n📊 Expected: ${expectedPages} pages\n`);

    // Step 1: Client build
    console.log('📦 Step 1/4: Building client...');
    await runCommand('npx', ['vite', 'build']);
    console.log('✅ Client build done\n');

    // Step 2: SSR build
    console.log('📦 Step 2/4: Building SSR...');
    await runCommand('npx', ['vite', 'build'], { SSR: 'true' });
    console.log('✅ SSR build done\n');

    // Step 3: Generate sitemaps
    console.log('📦 Step 3/4: Generating sitemaps...');
    await generateSitemaps();

    // Step 4: Prerender pages
    console.log('\n📦 Step 4/4: Prerendering pages...');
    const { total, failed } = await prerenderAllPages();

    console.log('\n🎉 BUILD COMPLETED!');
    console.log(`📊 Total: ${total} pages prerendered`);

  } catch (error) {
    console.error('❌ Build failed:', error.message);
    process.exit(1);
  }
}

build();
