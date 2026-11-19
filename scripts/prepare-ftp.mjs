import { copyFile, mkdir } from 'node:fs/promises';
const api = new URL('../public/api/', import.meta.url);
await mkdir(api, { recursive: true });
await copyFile(new URL('./club-sources.json', import.meta.url), new URL('sources.json', api));
