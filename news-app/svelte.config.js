import adapter from '@sveltejs/adapter-static';
import { readFileSync, existsSync } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const entriesPath = join(__dirname, 'src', 'generated-prerender-entries.json');
const fromFile = existsSync(entriesPath)
  ? JSON.parse(readFileSync(entriesPath, 'utf8'))
  : ['*', '/news'];

// メインサイトへのリダイレクト用（404 を防ぐ）
const redirectPaths = [
  '/company',
  '/service',
  '/initiative',
  '/initiative/student',
  '/initiative/media',
  '/contact'
];
const entries = [...fromFile, ...redirectPaths];

/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    adapter: adapter({
      pages: 'build',
      assets: 'build',
      fallback: undefined,
      precompress: false,
      strict: true
    }),
    prerender: {
      handleHttpError: 'warn',
      crawl: false,
      entries
    }
  }
};

export default config;
