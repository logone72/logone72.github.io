import { cp, rm } from 'node:fs/promises';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const finalDist = resolve(root, 'dist');
const homeDist = resolve(root, 'apps/home/dist');
const blogDist = resolve(root, 'apps/blog/.vitepress/dist');

await rm(finalDist, { recursive: true, force: true });
await cp(homeDist, finalDist, { recursive: true });
await cp(blogDist, resolve(finalDist, 'blog'), { recursive: true });
