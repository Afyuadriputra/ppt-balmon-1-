/**
 * Resolves an asset path against Vite's base URL.
 * Works seamlessly on:
 * - GitHub Pages (e.g. /ppt-balmon-1-/)
 * - Vercel / Netlify / Custom domains (/)
 * - Local development server (/)
 * - Relative deployments (./)
 */
export function asset(path: string): string {
  const clean = path.startsWith('/') ? path.slice(1) : path;
  const base = import.meta.env.BASE_URL || './';
  if (base.endsWith('/')) {
    return `${base}${clean}`;
  }
  return `${base}/${clean}`;
}
