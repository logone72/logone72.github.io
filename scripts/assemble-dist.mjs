import { cp, readFile, rm, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

import { absoluteRoutes } from '../src/router/index.mjs';

const root = resolve(import.meta.dirname, '..');
const finalDist = resolve(root, 'dist');
const homeDist = resolve(root, 'apps/home/dist');
const blogDist = resolve(root, 'apps/blog/.vitepress/dist');

const addHomeUrls = (sitemap) => {
  const urlset = sitemap.indexOf('<urlset');
  const insertionPoint = sitemap.indexOf('>', urlset) + 1;
  if (urlset < 0 || insertionPoint === 0) {
    throw new Error('Invalid blog sitemap: <urlset> was not found.');
  }

  const entries = [absoluteRoutes.home, absoluteRoutes.homeKo]
    .map((url) => `<url><loc>${url}</loc></url>`)
    .join('');

  return `${sitemap.slice(0, insertionPoint)}${entries}${sitemap.slice(insertionPoint)}`;
};

await rm(finalDist, { recursive: true, force: true });
await cp(homeDist, finalDist, { recursive: true });
await cp(blogDist, resolve(finalDist, 'blog'), { recursive: true });

const blogSitemap = await readFile(resolve(blogDist, 'sitemap.xml'), 'utf8');
await writeFile(resolve(finalDist, 'sitemap.xml'), addHomeUrls(blogSitemap));
