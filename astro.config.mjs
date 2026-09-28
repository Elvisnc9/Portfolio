// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  // The site is one page now; old page addresses point at their sections
  redirects: {
    '/about': '/#about',
    '/notes': '/#notes',
    '/contact': '/#contact',
    '/work': '/',
  },
});
