import { cpSync, readdirSync, rmSync, readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { resolve, relative, join } from 'node:path';
const root = fileURLToPath(new URL('../', import.meta.url));
const dist = resolve(root, 'dist');
const target = resolve(root, 'dubnica');
if (relative(root, target) !== 'dubnica') throw new Error('Invalid static output directory');
// The repository tracks this static build alongside its React sources.
cpSync(dist, target, { recursive: true });
const built = new Set(readdirSync(join(dist, 'assets')));
for (const name of readdirSync(join(target, 'assets'))) {
  if (/^index-.*\.(js|css)$/.test(name) && !built.has(name)) {
    const path = resolve(target, 'assets', name);
    if (relative(target, path).startsWith('..')) throw new Error('Invalid bundle path');
    rmSync(path);
  }
}
const html = join(target, 'index.html');
writeFileSync(html, readFileSync(html, 'utf8').replace(/\r+(?=\n)/g, ''));
