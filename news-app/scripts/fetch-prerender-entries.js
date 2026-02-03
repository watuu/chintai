/**
 * Build-time script: fetch all news slugs from microCMS and write entries for SSG.
 * Run before `vite build` if you use adapter-static with dynamic [slug] routes.
 * Requires: MICROCMS_SERVICE_DOMAIN, MICROCMS_API_KEY in env.
 *
 * Usage: node scripts/fetch-prerender-entries.js
 * Output: src/generated-prerender-entries.json
 */

import { writeFileSync, mkdirSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import 'dotenv/config';

const __dirname = dirname(fileURLToPath(import.meta.url));
const domain = process.env.MICROCMS_SERVICE_DOMAIN;
const key = process.env.MICROCMS_API_KEY;

const outPath = join(__dirname, '..', 'src', 'generated-prerender-entries.json');

async function fetchAllSlugs() {
  if (!domain || !key) {
    console.warn('MICROCMS_* not set; writing default entries (no [slug] entries).');
    return ['*', '/news', '/api/news/latest.json'];
  }
  const base = `https://${domain}.microcms.io/api/v1`;
  const slugs = [];
  let offset = 0;
  const limit = 100;
  while (true) {
    const url = `${base}/news?limit=${limit}&offset=${offset}&fields=id,slug`;
    const res = await fetch(url, { headers: { 'X-MICROCMS-API-KEY': key } });
    if (!res.ok) break;
    const data = await res.json();
    const contents = data.contents ?? [];
    for (const c of contents) slugs.push('/news/' + (c.slug || c.id));
    if (contents.length < limit) break;
    offset += limit;
  }
  return ['*', '/news', '/api/news/latest.json', ...slugs];
}

fetchAllSlugs()
  .then((entries) => {
    mkdirSync(dirname(outPath), { recursive: true });
    writeFileSync(outPath, JSON.stringify(entries, null, 2), 'utf8');
    console.log('Wrote', entries.length, 'prerender entries to', outPath);
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
