// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// The production URL and base path come from env vars so one codebase serves
// both GitHub Pages (https://cassie-lyn.github.io under /BreeWebsite — see
// .github/workflows/deploy.yml) and a root-domain host like Cloudflare Pages
// or a future custom domain (no env vars needed; defaults below).
const site = process.env.SITE_URL ?? 'https://breewebsite.pages.dev';
const base = process.env.BASE_PATH ?? '/';

export default defineConfig({
  site,
  base,
  integrations: [
    sitemap({
      // The /thanks confirmation page is noindex — keep it out of the sitemap too.
      filter: (page) => !page.endsWith('/thanks/'),
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
