/**
 * microCMS API client (server-side only).
 * Set MICROCMS_SERVICE_DOMAIN and MICROCMS_API_KEY in env.
 */

const getConfig = () => {
  const domain = process.env.MICROCMS_SERVICE_DOMAIN;
  const key = process.env.MICROCMS_API_KEY;
  if (!domain || !key) return null;
  return { domain, key };
};

const baseUrl = (domain) => `https://${domain}.microcms.io/api/v1`;

/**
 * @param {string} endpoint - e.g. "news" or "news/slug-here"
 * @param {{ limit?: number, offset?: number, filters?: string, orders?: string }} [params]
 * @returns {Promise<any>}
 */
export async function fetchFromMicroCMS(endpoint, params = {}) {
  const config = getConfig();
  if (!config) return { contents: [], totalCount: 0 };
  const { domain, key } = config;
  const url = new URL(`${baseUrl(domain)}/${endpoint}`);
  Object.entries(params).forEach(([k, v]) => {
    if (v != null && v !== '') url.searchParams.set(k, String(v));
  });
  const res = await fetch(url.toString(), {
    headers: { 'X-MICROCMS-API-KEY': key }
  });
  if (!res.ok) {
    throw new Error(`microCMS API error: ${res.status} ${res.statusText}`);
  }
  return res.json();
}

/**
 * Fetch list of news with optional filters and pagination.
 * Expects microCMS API "news" with fields: id, slug, title, category, publishedAt, pdf (optional).
 */
export async function getNewsList({ limit = 10, offset = 0, year, categoryId } = {}) {
  const filters = [];
  if (year) filters.push(`publishedAt[contains]${year}-`);
  if (categoryId) filters.push(`category[equals]${categoryId}`);
  const params = { limit, offset };
  if (filters.length) params.filters = filters.join('][');
  params.orders = '-publishedAt';
  const data = await fetchFromMicroCMS('news', params);
  return data;
}

/**
 * Fetch single news by slug.
 * Expects microCMS API "news" with slug field and getBySlug or filter by slug.
 */
export async function getNewsBySlug(slug) {
  const data = await fetchFromMicroCMS('news', { filters: `slug[equals]${slug}`, limit: 1 });
  const contents = data.contents ?? [];
  return contents[0] ?? null;
}

/**
 * Fetch latest N items for top page CSR.
 */
export async function getLatestNews(limit = 6) {
  const data = await fetchFromMicroCMS('news', { limit, orders: '-publishedAt' });
  return data.contents ?? [];
}
