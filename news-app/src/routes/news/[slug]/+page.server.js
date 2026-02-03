import { getNewsBySlug } from '$lib/microcms.js';
import { error } from '@sveltejs/kit';

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
  const slug = params.slug;
  const item = await getNewsBySlug(slug);
  if (!item) throw error(404, 'Not found');
  return { item };
}
