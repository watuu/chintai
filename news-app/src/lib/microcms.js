/**
 * microCMS API client (server-side only).
 * .env に MICROCMS_SERVICE_DOMAIN と MICROCMS_API_KEY を設定。
 * 開発時は $env/dynamic/private で .env が読み込まれる。
 * 101件以上の取得には microcms-js-sdk の getAllContents を使用。
 * @see https://help.microcms.io/ja/knowledge/fetch-big-data
 */
import { env } from '$env/dynamic/private';
import { createClient } from 'microcms-js-sdk';

const getConfig = () => {
  const domain = env.MICROCMS_SERVICE_DOMAIN;
  const key = env.MICROCMS_API_KEY;
  if (!domain || !key) return null;
  return { domain, key };
};

/** SDK クライアント（全件取得用） */
function getSdkClient() {
  const config = getConfig();
  if (!config) return null;
  return createClient({
    serviceDomain: config.domain,
    apiKey: config.key
  });
}

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
  if (year) filters.push(`publishedAt[begins_with]${year}-`);
  if (categoryId) filters.push(`category[equals]${categoryId}`);
  const params = { limit, offset };
  if (filters.length) params.filters = filters.join('[and]');
  params.orders = '-publishedAt';
  const data = await fetchFromMicroCMS('news', params);
  return data;
}

/**
 * Fetch single news by ID.
 * microCMS の単一取得 API: GET /api/v1/news/{contentId} を使用（slug がなく id のみの場合も対応）
 */
export async function getNewsById(id) {
  const config = getConfig();
  if (!config) return null;
  const { domain, key } = config;
  const url = `${baseUrl(domain)}/news/${encodeURIComponent(id)}`;
  const res = await fetch(url, {
    headers: { 'X-MICROCMS-API-KEY': key }
  });
  if (!res.ok) return null;
  return res.json();
}

/**
 * Fetch latest N items for top page CSR.
 */
export async function getLatestNews(limit = 6) {
  const data = await fetchFromMicroCMS('news', { limit, orders: '-publishedAt' });
  return data.contents ?? [];
}

/**
 * 指定日時より前の記事を1件取得（前の記事用）。
 */
export async function getPrevNews(publishedAt) {
  if (!publishedAt) return null;
  const data = await fetchFromMicroCMS('news', {
    filters: `publishedAt[less_than]${publishedAt}`,
    limit: 1,
    orders: '-publishedAt'
  });
  const contents = data.contents ?? [];
  return contents[0] ?? null;
}

/**
 * 指定日時より後の記事を1件取得（次の記事用）。
 */
export async function getNextNews(publishedAt) {
  if (!publishedAt) return null;
  const data = await fetchFromMicroCMS('news', {
    filters: `publishedAt[greater_than]${publishedAt}`,
    limit: 1,
    orders: 'publishedAt'
  });
  const contents = data.contents ?? [];
  return contents[0] ?? null;
}

/**
 * 一覧から年代の選択肢を取得（フィルタ用）。
 * SDK の getAllContents で全件取得してユニークな年を返す（limit 100 制限を超えても取得可能）。
 * @see https://help.microcms.io/ja/knowledge/fetch-big-data
 */
export async function getNewsYears() {
  const client = getSdkClient();
  if (!client) return [];
  const res = await client.getAllContents({ endpoint: 'news' });
  const contents = Array.isArray(res) ? res : (res?.contents ?? []);
  const years = [];
  for (const item of contents) {
    if (item.publishedAt) {
      const y = item.publishedAt.slice(0, 4);
      if (y && !years.includes(y)) years.push(y);
    }
  }
  years.sort((a, b) => Number(b) - Number(a));
  return years;
}

/**
 * カテゴリ一覧を取得（GET /api/v1/categories）。
 */
export async function getCategories() {
  const data = await fetchFromMicroCMS('categories', {});
  const contents = data.contents ?? [];
  return contents.map((c) => ({ id: c.id, name: c.name ?? c.id }));
}
