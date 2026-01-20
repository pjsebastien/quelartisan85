import { readFileSync, writeFileSync, readdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const blogDir = join(__dirname, 'public', 'blog');
const cssLink = '    <link rel="stylesheet" href="/blog/blog-styles.css">';

// Get all HTML files in the blog directory
const files = readdirSync(blogDir).filter(file => file.endsWith('.html'));

console.log(`Found ${files.length} blog HTML files to update...`);

let updatedCount = 0;

files.forEach(file => {
  const filePath = join(blogDir, file);
  let content = readFileSync(filePath, 'utf-8');

  // Check if CSS link already exists
  if (content.includes('blog-styles.css')) {
    console.log(`✓ ${file} - CSS already linked`);
    return;
  }

  // Add CSS link after the description meta tag
  if (content.includes('</head>')) {
    content = content.replace('</head>', `${cssLink}\n</head>`);
    writeFileSync(filePath, content, 'utf-8');
    updatedCount++;
    console.log(`✓ ${file} - CSS link added`);
  } else {
    console.log(`✗ ${file} - No </head> tag found, skipping`);
  }
});

console.log(`\nDone! Updated ${updatedCount} of ${files.length} files.`);
