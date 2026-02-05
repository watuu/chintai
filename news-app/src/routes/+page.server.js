import { getAllNews, getNewsYears, getCategories } from '$lib/microcms.js';

/** @type {import('./$types').PageServerLoad} */
export async function load() {
  // 全件取得してクライアントでフィルタ・ページング（静的ビルドでフォーム送信後に load が再実行されないため）
  const [allList, years, categories] = await Promise.all([
    getAllNews(),
    getNewsYears(),
    getCategories()
  ]);
  return { allList, years, categories };
}
