import type { APIRoute } from 'astro';
import { SITE } from '../config';

// Generated at build time so the sitemap URL always matches the deployed
// site + base path (GitHub Pages subpath today, root domain later).
export const GET: APIRoute = () =>
  new Response(`User-agent: *\nAllow: /\n\nSitemap: ${SITE.url}/sitemap-index.xml\n`, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
