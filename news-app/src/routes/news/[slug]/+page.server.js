import { getNewsById } from '$lib/microcms.js';
import { error } from '@sveltejs/kit';

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
  const id = params.slug; // URL は /news/{id} の想定（microCMS の content id）
  const item = await getNewsById(id);
  if (!item) throw error(404, 'Not found');
  return { item };
}
