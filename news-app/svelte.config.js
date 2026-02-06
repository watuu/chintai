import adapter from '@sveltejs/adapter-static';
import { readFileSync, existsSync } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const entriesPath = join(__dirname, 'src', 'generated-prerender-entries.json');

function getEntries() {
  if (!existsSync(entriesPath)) return ['*', '/news'];
  return JSON.parse(readFileSync(entriesPath, 'utf8'));
}

const entries = getEntries();
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
      },
      // [slug] はクロールで見つからないことがあるので、entries から slug パスを明示してプリレンダーする
      handleUnseenRoutes: (route) => {
        if (route.id !== '/[slug]') return;
        const all = getEntries();
        // /news/ の直下の1セグメントのみ（例: /news/placeholder）
        const slugPaths = all.filter(
          (p) => typeof p === 'string' && /^\/news\/[^/]+$/.test(p)
        );
        return slugPaths;
      }
    }
  }
};

export default config;
