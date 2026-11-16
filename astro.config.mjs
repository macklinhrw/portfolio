// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import { satteri } from '@astrojs/markdown-satteri';
import postEndPlugin from './src/lib/post-end-plugin.mjs';

// https://astro.build/config
export default defineConfig({
  site: 'https://macklinw.com',

  integrations: [react()],

  markdown: {
    // Every blog post ends with a sign-off above its footnotes
    processor: satteri({ hastPlugins: [postEndPlugin] }),
    shikiConfig: {
      themes: { light: 'github-light', dark: 'github-dark' },
      defaultColor: false,
    },
  },

  vite: {
    plugins: [tailwindcss()]
  }
});
