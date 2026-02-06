import adapter from '@sveltejs/adapter-static';
import { readFileSync, existsSync } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const entriesPath = join(__dirname, 'src', 'generated-prerender-entries.json');
const entries = existsSync(entriesPath)
  ? JSON.parse(readFileSync(entriesPath, 'utf8'))
  : ['*', '/news'];

const basePath = process.env.NODE_ENV === 'production' ? '/news' : '';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    paths: {
      base: basePath
    },
    adapter: adapter({
      pages: 'build',
      assets: 'build',
      fallback: undefined,
      precompress: false,
      strict: true
    }),
    prerender: {
      // ロゴの href="../" などで / にリンクされ、base 外パスをクロールしようとしてエラーになるのを防ぐ
      handleHttpError: ({ path, message }) => {
        if (basePath && !path.startsWith(basePath)) return;
        throw new Error(message);
      }
    }
  }
};

export default config;
