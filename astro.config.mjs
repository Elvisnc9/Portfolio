// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  // Used for absolute URLs in link previews (og:url, og:image)
  site: 'https://elvescorps.vercel.app',
  // The site is one page now; old page addresses point at their sections
  redirects: {
    '/about': '/#about',
    '/notes': '/#notes',
    '/contact': '/#contact',
    '/work': '/',
  },
});
