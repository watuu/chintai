import { env } from '$env/dynamic/private';

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
  const path = params.path ?? '';
  const origin = env.MAIN_SITE_ORIGIN || 'https://www.chintai.jp';
  const redirectUrl = path ? `${origin.replace(/\/$/, '')}/${path}` : origin;
  return { redirectUrl };
}
