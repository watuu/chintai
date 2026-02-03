import { getNewsList } from '$lib/microcms.js';

/** @type {import('./$types').PageServerLoad} */
export async function load({ url }) {
  let limit = 10, offset = 0, year, categoryId;
  try {
    if (url?.searchParams) {
      limit = Number(url.searchParams.get('limit')) || 10;
      offset = Number(url.searchParams.get('offset')) || 0;
      year = url.searchParams.get('year') || undefined;
      categoryId = url.searchParams.get('category') || undefined;
    }
  } catch (_) {
    // prerender 時など url.searchParams にアクセスできない場合
  }

  const data = await getNewsList({ limit, offset, year, categoryId });
  const contents = data.contents ?? [];
  const totalCount = data.totalCount ?? 0;

  return {
    list: contents,
    totalCount,
    limit,
    offset
  };
}
