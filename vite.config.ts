import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  if (command === 'build' && process.env.SSR) {
    // SSR build configuration
    return {
      plugins: [react()],
      build: {
        ssr: true,
        outDir: 'dist-ssr',
        rollupOptions: {
          input: 'src/entry-server.tsx',
          output: {
            format: 'es'
          }
        }
      },
      optimizeDeps: {
        exclude: ['lucide-react'],
      },
    };
  }
  
  // Client build configuration
  return {
    plugins: [react()],
    optimizeDeps: {
      exclude: ['lucide-react'],
    },
  };
});
