import { getLatestNews } from '$lib/microcms.js';

export const prerender = true;

/** @type {import('./$types').RequestHandler} */
export async function GET() {
  const list = await getLatestNews(6);
  const body = JSON.stringify({ contents: list });
  return new Response(body, {
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'public, max-age=60'
    }
  });
}
