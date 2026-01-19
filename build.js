import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

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

// Main build function
async function build() {
  try {
    // Step 1: Client build
    console.log('\n📦 Step 1/3: Building client...');
    await runCommand('npx', ['vite', 'build']);
    console.log('✅ Client build completed\n');

    // Step 2: SSR build
    console.log('📦 Step 2/3: Building SSR...');
    await runCommand('npx', ['vite', 'build'], { SSR: 'true' });
    console.log('✅ SSR build completed\n');

    // Step 3: Generate sitemap and prerender
    console.log('📦 Step 3/3: Generating sitemap and prerendering pages...');
    await runCommand('node', ['generate-sitemap.js']);
    console.log('✅ Sitemap and prerendering completed\n');

    console.log('🎉 Build completed successfully!');
  } catch (error) {
    console.error('❌ Build failed:', error.message);
    process.exit(1);
  }
}

build();
