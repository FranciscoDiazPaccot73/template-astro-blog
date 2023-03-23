import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import tailwind from '@astrojs/tailwind';
import image from '@astrojs/image';
import sitemap from '@astrojs/sitemap';
import react from '@astrojs/react';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// https://astro.build/config
export default defineConfig({
	site: 'https://example.com',
	integrations: [mdx(), sitemap(), tailwind({
    config: {
      applyBaseStyles: false
    }
  }), image(), react()],
  vite: {
    plugins: [],
    resolve: {
      alias: {
        '#': path.resolve(__dirname, './src')
      }
    },
    optimizeDeps: {
      allowNodeBuiltins: true
    }
  },
});
