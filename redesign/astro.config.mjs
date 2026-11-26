import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://diveshadivarekar.github.io',
  // Emits work.html, about.html, ... so existing URLs keep working.
  build: { format: 'file' },
  vite: { plugins: [tailwindcss()] },
});
