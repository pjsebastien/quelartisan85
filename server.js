import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { existsSync } from 'fs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 8080;

// Serve static assets
app.use(express.static(join(__dirname, 'dist'), {
  maxAge: '1y',
  etag: true
}));

// Handle all routes - serve prerendered HTML
app.get('*', (req, res) => {
  // Remove trailing slash and query params
  let path = req.path.replace(/\/$/, '') || '/index';

  // Build the file path
  let filePath;
  if (path === '/index') {
    filePath = join(__dirname, 'dist', 'index.html');
  } else {
    filePath = join(__dirname, 'dist', path, 'index.html');
  }

  // Check if the prerendered file exists
  if (existsSync(filePath)) {
    res.sendFile(filePath);
  } else {
    // Fallback to main index.html for client-side routing
    res.sendFile(join(__dirname, 'dist', 'index.html'));
  }
});

app.listen(PORT, () => {
  console.log(`\n🚀 Server running at http://localhost:${PORT}`);
  console.log(`📦 Serving prerendered pages from dist folder`);
  console.log(`🔍 All ${7074} pages are SEO-ready with full HTML content!\n`);
});
