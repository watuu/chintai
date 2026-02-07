import { getNewsById, getPrevNews, getNextNews } from '$lib/microcms.js';
import { error, redirect } from '@sveltejs/kit';

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
  const id = params.slug; // URL は /news/{id} の想定（microCMS の content id）
  const item = await getNewsById(id);
  if (!item) throw error(404, 'Not found');
  // content も body もない slug はページ生成しない（404）。content は microCMS でオブジェクトまたは文字列のことがある
  const hasContent =
    (item.content != null && item.content !== '') || (item.body != null && item.body !== '');
  if (!hasContent) throw error(404, 'Not found');

  const pdfUrl = item.pdf?.url ?? item.pdfurl;
  if (pdfUrl) throw redirect(302, pdfUrl);

  const [prev, next] = await Promise.all([
    getPrevNews(item.publishedAt),
    getNextNews(item.publishedAt)
  ]);

  return { item, prev, next };
}
