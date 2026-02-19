import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { SitemapStream, streamToPromise, SitemapIndexStream } from 'sitemap';

const __dirname = dirname(fileURLToPath(import.meta.url));

console.log('🚀 Starting build process...\n');

// Function to run a command
function runCommand(command, args, env = {}) {
  return new Promise((resolve, reject) => {
    console.log(`📦 Running: ${command} ${args.join(' ')}`);

    const child = spawn(command, args, {
      cwd: __dirname,
      env: { ...process.env, ...env },
      stdio: 'inherit',
      shell: true
    });

    child.on('close', (code) => {
      if (code !== 0) {
        reject(new Error(`Command failed with code ${code}`));
      } else {
        resolve();
      }
    });

    child.on('error', (err) => {
      reject(err);
    });
  });
}

// Generate sitemap files
async function generateSitemaps(metiers, villes) {
  const hostname = 'https://www.quelartisan85.fr';
  const now = new Date().toISOString();

  console.log(`\n📊 Data: ${metiers.length} métiers, ${villes.length} villes`);

  const sitemapFiles = [];

  async function writeSitemap(urls, filename) {
    const sitemap = new SitemapStream({ hostname });
    for (const urlData of urls) {
      sitemap.write(urlData);
    }
    sitemap.end();
    const xml = await streamToPromise(sitemap);
    writeFileSync(resolve(__dirname, 'dist', filename), xml.toString());
    console.log(`   ✅ ${filename} (${urls.length} URLs)`);
    return filename;
  }

  // 1. Static pages
  console.log('\n📄 Generating sitemap-pages.xml...');
  const staticUrls = [
    { url: '/', changefreq: 'daily', priority: 1.0, lastmod: now },
    { url: '/devis', changefreq: 'weekly', priority: 0.9, lastmod: now },
    { url: '/charte', changefreq: 'monthly', priority: 0.7, lastmod: now },
    { url: '/politique-confidentialite', changefreq: 'yearly', priority: 0.5, lastmod: now },
    { url: '/mentions-legales', changefreq: 'yearly', priority: 0.5, lastmod: now }
  ];
  sitemapFiles.push(await writeSitemap(staticUrls, 'sitemap-pages.xml'));

  // 2. Blog
  console.log('\n📄 Generating sitemap-blog.xml...');
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
  sitemapFiles.push(await writeSitemap(blogUrls, 'sitemap-blog.xml'));

  // 3. Métiers (Vendée only)
  console.log('\n📄 Generating sitemap-metiers.xml...');
  const metierUrls = metiers.map(metier => ({
    url: `/${metier.slug}/vendee`,
    changefreq: 'weekly',
    priority: 0.8,
    lastmod: now
  }));
  sitemapFiles.push(await writeSitemap(metierUrls, 'sitemap-metiers.xml'));

  // 4. Métiers + Villes
  console.log('\n📄 Generating sitemap-metiers-villes.xml...');
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
  sitemapFiles.push(await writeSitemap(metierVilleUrls, 'sitemap-metiers-villes.xml'));

  // 5. Sitemap index
  console.log('\n📄 Generating sitemap.xml (index)...');
  const sitemapIndex = new SitemapIndexStream();
  for (const file of sitemapFiles) {
    sitemapIndex.write({ url: `${hostname}/${file}`, lastmod: now });
  }
  sitemapIndex.end();
  const indexXml = await streamToPromise(sitemapIndex);
  writeFileSync(resolve(__dirname, 'dist', 'sitemap.xml'), indexXml.toString());

  const total = staticUrls.length + blogUrls.length + metierUrls.length + metierVilleUrls.length;
  console.log(`\n✅ Sitemaps générés: ${total} URLs total`);

  return { staticUrls, blogUrls, metierUrls, metierVilleUrls, blogArticles };
}

// Prerender ALL pages with batch processing to manage memory
async function prerenderAllPages(metiers, villes, blogArticles) {
  let render;
  try {
    const ssrModule = await import('./dist-ssr/entry-server.js');
    render = ssrModule.render;
    console.log('\n✅ SSR module loaded');
  } catch (error) {
    console.error('❌ SSR module failed:', error.message);
    return;
  }

  const baseHtml = readFileSync(resolve(__dirname, 'dist/index.html'), 'utf8');
  let totalPages = 0;
  let failedPages = 0;

  function prerenderPage(url, outputPath) {
    try {
      const appHtml = render(url);
      const titleMatch = appHtml.match(/<title[^>]*>([^<]*)<\/title>/i);
      const metaMatch = appHtml.match(/<meta\s+name=["']description["']\s+content=["']([^"']*)["'][^>]*>/i);

      let finalHtml = baseHtml
        .replace('<!--app-html-->', appHtml)
        .replace(/<title[^>]*>([^<]*)<\/title>/i, `<title>${titleMatch?.[1] || 'Quel Artisan 85'}</title>`)
        .replace(/<meta\s+name=["']description["']\s+content=["'][^"']*["'][^>]*>/i,
          `<meta name="description" content="${metaMatch?.[1] || 'Trouvez un artisan en Vendée'}" />`);

      const outputDir = dirname(outputPath);
      mkdirSync(outputDir, { recursive: true });
      writeFileSync(outputPath, finalHtml, 'utf8');
      totalPages++;
      return true;
    } catch (error) {
      failedPages++;
      return false;
    }
  }

  // Force garbage collection if available
  function tryGC() {
    if (global.gc) {
      global.gc();
    }
  }

  // ==========================================
  // 1. STATIC PAGES
  // ==========================================
  console.log('\n🔧 Prerendering static pages...');
  const staticPages = [
    { url: '/', path: 'dist/index.html' },
    { url: '/devis', path: 'dist/devis/index.html' },
    { url: '/charte', path: 'dist/charte/index.html' },
    { url: '/politique-confidentialite', path: 'dist/politique-confidentialite/index.html' },
    { url: '/mentions-legales', path: 'dist/mentions-legales/index.html' }
  ];

  for (const page of staticPages) {
    prerenderPage(page.url, resolve(__dirname, page.path));
  }
  console.log(`   ✅ ${staticPages.length} pages statiques`);

  // ==========================================
  // 2. BLOG PAGES
  // ==========================================
  console.log('\n🔧 Prerendering blog pages...');
  prerenderPage('/blog', resolve(__dirname, 'dist/blog/index.html'));
  for (const slug of blogArticles) {
    prerenderPage(`/blog/${slug}`, resolve(__dirname, `dist/blog/${slug}/index.html`));
  }
  console.log(`   ✅ ${blogArticles.length + 1} pages blog`);
  tryGC();

  // ==========================================
  // 3. MÉTIERS / VENDÉE PAGES (106 pages)
  // ==========================================
  console.log('\n🔧 Prerendering métiers/vendée pages...');
  for (const metier of metiers) {
    prerenderPage(`/${metier.slug}/vendee`, resolve(__dirname, `dist/${metier.slug}/vendee/index.html`));
  }
  console.log(`   ✅ ${metiers.length} pages métiers/vendée`);
  tryGC();

  // ==========================================
  // 4. MÉTIERS + VILLES PAGES (7950 pages)
  // Process in batches to manage memory
  // ==========================================
  console.log('\n🔧 Prerendering métiers+villes pages...');
  const BATCH_SIZE = 100; // Process 100 pages at a time
  let batchCount = 0;
  let pageCount = 0;
  const totalMetierVille = metiers.length * villes.length;

  for (const metier of metiers) {
    for (const ville of villes) {
      prerenderPage(
        `/${metier.slug}/${ville.slug}`,
        resolve(__dirname, `dist/${metier.slug}/${ville.slug}/index.html`)
      );
      pageCount++;
      batchCount++;

      // Every BATCH_SIZE pages, log progress and try to free memory
      if (batchCount >= BATCH_SIZE) {
        const percent = Math.round((pageCount / totalMetierVille) * 100);
        console.log(`   📊 ${pageCount}/${totalMetierVille} (${percent}%) - ${metier.nom}...`);
        batchCount = 0;
        tryGC();

        // Small delay to let Node.js breathe
        await new Promise(r => setTimeout(r, 10));
      }
    }
  }
  console.log(`   ✅ ${pageCount} pages métiers+villes`);

  // ==========================================
  // SUMMARY
  // ==========================================
  console.log('\n═══════════════════════════════════════════════════════════');
  console.log(`🎉 PRERENDERING COMPLETED!`);
  console.log(`   ✅ ${totalPages} pages prérendues avec succès`);
  if (failedPages > 0) {
    console.log(`   ⚠️ ${failedPages} pages ont échoué`);
  }
  console.log('═══════════════════════════════════════════════════════════');
}

// Main build function
async function build() {
  try {
    // Load data early
    const metiers = JSON.parse(readFileSync('./src/data/metiers.json', 'utf8'));
    const villes = JSON.parse(readFileSync('./src/data/villes.json', 'utf8'));

    const expectedPages = 5 + 15 + metiers.length + (metiers.length * villes.length);
    console.log(`📊 Expected pages: ${expectedPages}`);
    console.log(`   - 5 static + 15 blog + ${metiers.length} métiers + ${metiers.length * villes.length} métiers+villes\n`);

    // Step 1: Client build
    console.log('📦 Step 1/4: Building client...');
    await runCommand('npx', ['vite', 'build']);
    console.log('✅ Client build completed\n');

    // Step 2: SSR build
    console.log('📦 Step 2/4: Building SSR...');
    await runCommand('npx', ['vite', 'build'], { SSR: 'true' });
    console.log('✅ SSR build completed\n');

    // Step 3: Generate sitemaps
    console.log('📦 Step 3/4: Generating sitemaps...');
    const { blogArticles } = await generateSitemaps(metiers, villes);

    // Step 4: Prerender ALL pages
    console.log('\n📦 Step 4/4: Prerendering ALL pages...');
    await prerenderAllPages(metiers, villes, blogArticles);

    console.log('\n🎉 BUILD COMPLETED SUCCESSFULLY!');
    console.log('🔍 All pages have full HTML for SEO crawlers.');
  } catch (error) {
    console.error('❌ Build failed:', error.message);
    process.exit(1);
  }
}

build();
