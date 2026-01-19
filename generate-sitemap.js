import { SitemapStream, streamToPromise } from 'sitemap';
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

async function generateSitemapAndPrerender() {
  const hostname = 'https://www.quelartisan85.fr/';
  
  // Create a stream to write to
  const sitemap = new SitemapStream({ hostname });
  
  // Array to store all routes for prerendering
  const prerenderRoutes = [];
  
  // Static pages with their priorities and change frequencies
  const staticPages = [
    { url: '/', changefreq: 'daily', priority: 1.0, outputPath: 'dist/index.html' },
    { url: '/devis', changefreq: 'weekly', priority: 0.9, outputPath: 'dist/devis/index.html' },
    { url: '/charte', changefreq: 'monthly', priority: 0.7, outputPath: 'dist/charte/index.html' },
    { url: '/politique-confidentialite', changefreq: 'yearly', priority: 0.5, outputPath: 'dist/politique-confidentialite/index.html' },
    { url: '/mentions-legales', changefreq: 'yearly', priority: 0.5, outputPath: 'dist/mentions-legales/index.html' }
  ];
  
  // Add static pages to sitemap and prerender them
  for (const page of staticPages) {
    sitemap.write({
      url: page.url,
      changefreq: page.changefreq,
      priority: page.priority,
      lastmod: new Date().toISOString()
    });
    
    prerenderRoutes.push(page.url);
    
    // Prerender the page
    const outputPath = resolve(__dirname, page.outputPath);
    prerenderRoute(page.url, outputPath);
  }
  
  // Add blog pages to sitemap and prerender them
  const blogPages = [
    { url: '/blog', outputPath: 'dist/blog/index.html' }
  ];
  
  for (const blogPage of blogPages) {
    sitemap.write({
      url: blogPage.url,
      changefreq: 'monthly',
      priority: blogPage.url === '/blog' ? 0.8 : 0.6,
      lastmod: new Date().toISOString()
    });
    
    prerenderRoutes.push(blogPage.url);
    
    // Prerender the blog page
    const outputPath = resolve(__dirname, blogPage.outputPath);
    prerenderRoute(blogPage.url, outputPath);
  }
  
  // Add trade pages for Vendée (/:tradeSlug/vendee)
  for (const metier of metiers) {
    const url = `/${metier.slug}/vendee`;
    sitemap.write({
      url: url,
      changefreq: 'weekly',
      priority: 0.8,
      lastmod: new Date().toISOString()
    });
    
    prerenderRoutes.push(url);
    
    // Prerender the page
    const outputPath = resolve(__dirname, `dist/${metier.slug}/vendee/index.html`);
    prerenderRoute(url, outputPath);
  }
  
  // Add all trade + city pages (/:tradeSlug/:citySlug)
  for (const metier of metiers) {
    for (const ville of villes) {
      const url = `/${metier.slug}/${ville.slug}`;
      sitemap.write({
        url: url,
        changefreq: 'weekly',
        priority: 0.7,
        lastmod: new Date().toISOString()
      });
      
      prerenderRoutes.push(url);
      
      // Prerender the page
      const outputPath = resolve(__dirname, `dist/${metier.slug}/${ville.slug}/index.html`);
      prerenderRoute(url, outputPath);
    }
  }
  
  // End the stream
  sitemap.end();
  
  // Generate the sitemap and save it
  const sitemapXML = await streamToPromise(sitemap);
  
  // Write sitemap to dist folder
  const distPath = resolve(__dirname, 'dist', 'sitemap.xml');
  writeFileSync(distPath, sitemapXML.toString());
  
  // Write prerender routes file for reference
  const prerenderRoutesPath = resolve(__dirname, 'dist', 'prerender-routes.txt');
  writeFileSync(prerenderRoutesPath, prerenderRoutes.join('\n'));
  
  console.log('');
  console.log('🎉 Build completed successfully!');
  console.log(`📍 Sitemap location: ${distPath}`);
  console.log(`📍 Prerender routes location: ${prerenderRoutesPath}`);
  console.log(`📊 Total URLs: ${prerenderRoutes.length}`);
  console.log('   - Static pages:', staticPages.length);
  console.log('   - Blog pages:', blogPages.length);
  console.log('   - Trade pages (Vendée):', metiers.length);
  console.log('   - Trade + City pages:', metiers.length * villes.length);
  console.log('');
  console.log('✅ All pages have been prerendered with full HTML content!');
  console.log('🔍 SEO crawlers will now see complete HTML for every page.');
}

// Run the generator
generateSitemapAndPrerender().catch(console.error);